from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet

class ActionEnviarProcedimentos(Action):
    def name(self) -> Text:
        return "action_enviar_procedimentos"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        dispatcher.utter_message(text="Aqui está nossa lista de procedimentos disponíveis.")
        return [SlotSet("resource_request", "procedimentos")]

class ActionEnviarPrecos(Action):
    def name(self) -> Text:
        return "action_enviar_precos"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        dispatcher.utter_message(text="Aqui está nossa tabela de preços atualizada.")
        return [SlotSet("resource_request", "precos")]

class ActionProcessoAgendamento(Action):
    def name(self) -> Text:
        return "action_processo_agendamento"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        message = """Para agendar sua consulta, preciso de algumas informações:
1. Nome completo
2. Telefone para contato
3. Procedimento de interesse
4. Melhor período (manhã/tarde)

Você pode me informar esses dados?"""
        
        dispatcher.utter_message(text=message)
        return [SlotSet("awaiting_booking_info", True)]

class ActionEnviarLocalizacao(Action):
    def name(self) -> Text:
        return "action_enviar_localizacao"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        dispatcher.utter_message(text="Aqui está nossa localização e como chegar até a clínica.")
        return [SlotSet("resource_request", "localizacao")]