# Build Android - TikJogos App

## Passo a passo para gerar o APK

### 1. Criar conta Expo (gratuita, 1 minuto)

Acesse https://expo.dev/signup e crie uma conta.

### 2. Fazer login no terminal

```bash
cd tikjogos-mobile
eas login
# Digite seu email e senha da conta Expo
```

### 3. Gerar o APK

```bash
./build-apk.sh
```

Ou manualmente:

```bash
eas build --platform android --profile preview
```

O build roda nos servidores da Expo (~10 minutos). Quando terminar, aparece um link para baixar o `.apk`.

### 4. Instalar no celular

1. Abra o link do APK no celular (ou transfira o arquivo)
2. Toque no arquivo `.apk`
3. Se pedir, permita "instalar de fontes desconhecidas"
4. Instalar e abrir

## Teste rápido sem gerar APK (Expo Go)

Para testar no celular sem precisar compilar:

```bash
# 1. Instale "Expo Go" no celular (Play Store)
# 2. No terminal:
cd tikjogos-mobile
npx expo start
# 3. Escaneie o QR code com a câmera do celular
```

## Publicar na Play Store

```bash
# Gerar AAB (formato da Play Store)
eas build --platform android --profile production

# Submeter (requer conta Google Play Console - $25 taxa única)
eas submit --platform android --profile production
```

## Limites gratuitos

- 30 builds/mês no plano gratuito da Expo
- Sem limite para testes via Expo Go
