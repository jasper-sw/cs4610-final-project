from django.urls import path
from aggieForumApp.views import (get_csrf,
                                 login_view,
                                 logout_view,
                                 session_view,
                                 whoami_view,
                                 CreateAccount)

urlpatterns = [
    path('csrf/', get_csrf, name='csrf'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('session/', session_view, name='session'),
    path('whoami/', whoami_view, name='whoami'),
    path('create-account/', CreateAccount.as_view(), name='create-accout')
]

