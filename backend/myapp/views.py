from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Test, UserTestResult
from .serializers import TestSerializer, UserTestResultSerializer, TestDetailSerializer


class TestListView(ListAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer


class TestDetailView(RetrieveAPIView):
    queryset = Test.objects.all()
    serializer_class = TestDetailSerializer


class SubmitTestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, test_id):
        test = Test.objects.get(id=test_id)
        score = 0

        # Ожидаем данные в формате [{"question": "4", "answer": "1"}, ...]
        submitted_answers = request.data.get("answers", [])
        for answer_data in submitted_answers:
            question_id = answer_data.get("question")
            selected_answer_id = answer_data.get("answer")

            if question_id and selected_answer_id:
                try:
                    question = test.questions.get(id=question_id)
                    answer = question.answers.get(id=selected_answer_id)
                    if answer.is_correct:
                        score += 1
                except Exception as e:
                    # Игнорируем ошибки в случае некорректных ID
                    print(f"Error processing question {question_id} with answer {selected_answer_id}: {e}")

        # Сохраняем результат
        result = UserTestResult.objects.create(user=request.user, test=test, score=score)
        return Response({"test_id": test_id, "score": score})

