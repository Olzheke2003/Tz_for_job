from django.urls import path
from .views import TestListView, TestDetailView, SubmitTestView

urlpatterns = [
    path('tests/', TestListView.as_view(), name='test_list'),
    path('tests/<int:pk>/', TestDetailView.as_view(), name='test_detail'),
    path('tests/<int:test_id>/submit/', SubmitTestView.as_view(), name='submit_test'),
]
