from rest_framework import serializers
from .models import Test, Question, Answer, UserTestResult


class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Answer
        fields = ['text', 'is_correct']


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['text', 'answers']


class TestSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Test
        fields = ['title', 'description', 'questions']


class UserTestResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTestResult
        fields = ['user', 'test', 'score', 'completed_at']
