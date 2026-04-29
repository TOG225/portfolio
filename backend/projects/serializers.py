from rest_framework import serializers
from .models import Category, Project


class CategorySerializer(serializers.ModelSerializer):
    project_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'icon', 'description', 'order', 'project_count']

    def get_project_count(self, obj):
        return obj.projects.filter(is_published=True).count()


class ProjectListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    has_report = serializers.SerializerMethodField()
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'description_short', 'project_type',
            'category', 'thumbnail', 'tech_stack', 'date_realized',
            'is_featured', 'github_url', 'demo_url', 'has_report',
        ]

    def get_has_report(self, obj):
        return bool(obj.report_pdf)

    def get_thumbnail(self, obj):
        if not obj.thumbnail:
            return None
        request = self.context.get('request')
        return request.build_absolute_uri(obj.thumbnail.url) if request else obj.thumbnail.url


class ProjectDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    has_report = serializers.SerializerMethodField()
    thumbnail = serializers.SerializerMethodField()
    report_pdf = serializers.SerializerMethodField()
    report_pdf_url = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'description_short', 'description_long',
            'project_type', 'category', 'github_url', 'demo_url',
            'report_pdf', 'report_pdf_url', 'thumbnail',
            'tech_stack', 'date_realized', 'is_featured', 'is_published',
            'order', 'has_report', 'created_at', 'updated_at',
        ]

    def get_has_report(self, obj):
        return bool(obj.report_pdf)

    def get_thumbnail(self, obj):
        if not obj.thumbnail:
            return None
        request = self.context.get('request')
        return request.build_absolute_uri(obj.thumbnail.url) if request else obj.thumbnail.url

    def get_report_pdf(self, obj):
        if not obj.report_pdf:
            return None
        request = self.context.get('request')
        return request.build_absolute_uri(obj.report_pdf.url) if request else obj.report_pdf.url

    def get_report_pdf_url(self, obj):
        if not obj.report_pdf:
            return None
        request = self.context.get('request')
        return request.build_absolute_uri(obj.report_pdf.url) if request else obj.report_pdf.url
