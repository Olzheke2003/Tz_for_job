from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Test, UserTestResult
from .serializers import TestSerializer, UserTestResultSerializer


class TestListView(ListAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer


class TestDetailView(RetrieveAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer


class SubmitTestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, test_id):
        test = Test.objects.get(id=test_id)
        score = 0
        for question in test.questions.all():
            selected_answer_id = request.data.get(str(question.id))
            if selected_answer_id:
                answer = question.answers.get(id=selected_answer_id)
                if answer.is_correct:
                    score += 1
        result = UserTestResult.objects.create(user=request.user, test=test, score=score)
        return Response({"test_id": test_id, "score": score})
