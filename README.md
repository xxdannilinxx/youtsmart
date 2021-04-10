# youtsmart
App consumindo API do Youtube para Smart TVs;

## 🚀 Como usar?
1) Faça o clone do repositório.
2) Rode os seguintes comandos
```
cd youtsmart
npm install
npm run start
```
3) Basta acessar o endereço http://127.0.0.1:8090/ (Por padrão 8090);

### 🔧 API Youtube - OAuth 2.0
O app consome a api do youtube, então é necessário gerar a chave API ou token no console de desenvolvedor do google e disponibilizar no arquivo: ```src/config/youtube.js```

### Vídeos
* No início são listados três (3) sugestões de vídeos por categoria, sendo elas músicas, educação e documentário;

### Pesquisa
* O campo faz a pesquisa pelo termo digitado direto no youtube e trás os nove (9) melhores resultados e armazena os últimos cinco (5) termos pesquisados (feature).

### 🔥 Vídeos assistidos recentemente (feature)
* Ficam armazenados os últimos três (3) vídeos em que o usuário assistiu, podendo ser visualizado no home do app;

### Favoritos
* O usuário pode adicionar vídeos em que gostar nos seus favoritos, podendo ser removido a qualquer momento sem restrição ou limite;