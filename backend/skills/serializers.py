from rest_framework import serializers
from .models import SkillCategory, Skill


class SkillSerializer(serializers.ModelSerializer):
    level_display = serializers.CharField(source='get_level_display', read_only=True)

    class Meta:
        model = Skill
        fields = ['id', 'name', 'level', 'level_display', 'order']


class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = SkillCategory
        fields = ['id', 'name', 'slug', 'icon', 'color', 'order', 'skills']
