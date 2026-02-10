#!/bin/bash
# Build APK do TikJogos para Android
# Usa EAS Build na nuvem (gratuito, 30 builds/mês)
#
# Pré-requisito: conta Expo (https://expo.dev/signup)
#
# Uso:
#   ./build-apk.sh          # APK de teste (preview)
#   ./build-apk.sh prod     # AAB para Play Store (production)

set -e

cd "$(dirname "$0")"

# Verificar login
if ! eas whoami &>/dev/null; then
  echo ""
  echo "╔══════════════════════════════════════════════╗"
  echo "║  Você precisa de uma conta Expo (gratuita)   ║"
  echo "║                                              ║"
  echo "║  1. Crie em: https://expo.dev/signup         ║"
  echo "║  2. Depois rode: eas login                   ║"
  echo "║  3. Execute este script novamente             ║"
  echo "╚══════════════════════════════════════════════╝"
  echo ""
  exit 1
fi

PROFILE="${1:-preview}"

if [ "$PROFILE" = "prod" ]; then
  PROFILE="production"
  echo "🏗️  Gerando AAB de produção (Play Store)..."
else
  echo "🏗️  Gerando APK de teste..."
fi

eas build --platform android --profile "$PROFILE"

echo ""
echo "✅ Build finalizado! O link do APK aparece acima."
echo "   Baixe e instale no celular Android."
