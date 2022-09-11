FROM nixos/nix

RUN nix-shell -p ungoogled-chromium nodejs-16_x nodePackages.yarn

WORKDIR /app
ENV PORT=3000

COPY .. ./package.json ./
COPY .. ./yarn.lock ./
COPY .. ./tsconfig.json ./

RUN yarn

COPY . .

RUN yarn build