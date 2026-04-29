from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from django.conf import settings
from django.core.mail import send_mail
from django.core.validators import validate_email
from django.core.exceptions import ValidationError


class ContactRateThrottle(AnonRateThrottle):
    rate = '5/hour'


class ContactMessageView(APIView):
    throttle_classes = [ContactRateThrottle]

    def post(self, request):
        name = request.data.get('name', '').strip()
        email = request.data.get('email', '').strip()
        subject = request.data.get('subject', '').strip() or 'Contact depuis le portfolio'
        message = request.data.get('message', '').strip()
        honeypot = request.data.get('website', '')

        if not name or len(name) < 2:
            return Response({'error': 'Nom invalide'}, status=400)
        try:
            validate_email(email)
        except ValidationError:
            return Response({'error': 'Email invalide'}, status=400)
        if not message or len(message) < 10:
            return Response({'error': 'Message trop court (10 caractères minimum)'}, status=400)
        if len(message) > 5000:
            return Response({'error': 'Message trop long (5000 caractères max)'}, status=400)

        if honeypot:
            return Response({'success': True}, status=200)

        if not settings.EMAIL_HOST:
            return Response(
                {'error': 'Configuration email manquante côté serveur.'},
                status=500
            )

        email_subject = f"[Portfolio Contact] {subject}"
        email_body = (
            f"Nouveau message depuis le portfolio\n\n"
            f"Nom: {name}\n"
            f"Email: {email}\n"
            f"Sujet: {subject}\n\n"
            f"Message:\n{message}\n"
        )

        try:
            send_mail(
                subject=email_subject,
                message=email_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.CONTACT_RECEIVER_EMAIL],
                fail_silently=False,
                reply_to=[email],
            )
        except Exception:
            return Response(
                {'error': "Impossible d'envoyer le message pour le moment."},
                status=500
            )

        return Response({'success': True, 'message': 'Message reçu'}, status=200)
