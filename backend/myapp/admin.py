from django.contrib import admin

from myapp.models import Test, Question, Answer, UserTestResult, CustomUser

admin.site.register(Test)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(UserTestResult)
admin.site.register(CustomUser)
