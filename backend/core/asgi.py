"""
ASGI config for core project.
Upgraded to Django Channels for WebSocket (real-time chat) support.
Routes:
    HTTP  → standard Django ASGI handler
    WS    → JWTAuthMiddleware → URLRouter → ChatConsumer
"""
import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

# Initialise Django ASGI app FIRST — this triggers django.setup()
# and loads the app registry before anything else touches models.
# Any import that pulls in Django models (directly or indirectly,
# like chat.middleware or chat.routing) MUST come after this line.
django_asgi_app = get_asgi_application()

from channels.routing import ProtocolTypeRouter, URLRouter  # noqa: E402
from chat.middleware import JWTAuthMiddleware  # noqa: E402
from chat.routing import websocket_urlpatterns  # noqa: E402

application = ProtocolTypeRouter({
    # Standard HTTP requests — handled by Django as usual
    'http': django_asgi_app,

    # WebSocket connections — authenticated via JWT, routed to ChatConsumer
    'websocket': JWTAuthMiddleware(
        URLRouter(websocket_urlpatterns)
    ),
})
