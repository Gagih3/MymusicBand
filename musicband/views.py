from django.shortcuts import render
from .models import Instrument
from django.forms.models import model_to_dict
import json as json

# Create your views here.


def main_view(request):

    if request.method == "POST":
        instrument_fields = json.loads(request.POST["td_inf"])  # конвертирует js массив в питоновский словарь dict
        instrument_id = request.POST["i_id"]  # показывает айдишник поля для изменения
        base_upd = Instrument.objects.filter(id=instrument_id)  # обьект который надо обновить
        """обновления информации в базе данных"""
        base_upd.update(**instrument_fields)

    database_information = Instrument.objects.all()  # список всех инструментов в базе данных
    for i in range(len(database_information)):
        dictionary = model_to_dict(database_information[i])  # словарь полей в обьекте инструмента
    return render(request, "musicband/base.html", context={"data": database_information, "dict": dictionary.items()})
