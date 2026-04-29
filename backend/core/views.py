from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle


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
        if not email or '@' not in email:
            return Response({'error': 'Email invalide'}, status=400)
        if not message or len(message) < 10:
            return Response({'error': 'Message trop court (10 caractères minimum)'}, status=400)
        if len(message) > 5000:
            return Response({'error': 'Message trop long (5000 caractères max)'}, status=400)

        if honeypot:
            return Response({'success': True}, status=200)

        print('[CONTACT] {} <{}> — {}'.format(name, email, subject))
        print('  Message: {}'.format(message[:200]))

        return Response({'success': True, 'message': 'Message reçu'}, status=200)
