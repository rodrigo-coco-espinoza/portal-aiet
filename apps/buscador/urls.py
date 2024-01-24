from django.urls import path
from .views import *

urlpatterns = [
    path('list', ListQueriesView.as_view()),
    path('combobox_options', ComboboxOptionsView.as_view()),
    path('edit_query', EditQueryView.as_view()),
    path('delete_query/<id>', DeleteQueryView.as_view()),
    path('delete_nota/<id>', DeleteNotaView.as_view()),
    path('add_nota', AddNota.as_view()),
]