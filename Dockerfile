FROM node:latest

WORKDIR /home/choreouser

EXPOSE 3000

COPY web/* /home/choreouser/

RUN apt-get update &&\
    apt install --only-upgrade linux-libc-dev &&\
    apt-get install -y iproute2 vim netcat-openbsd &&\
    addgroup --gid 10555 choreo &&\
    adduser --disabled-password  --no-create-home --uid 10555 --ingroup choreo choreouser &&\
    usermod -aG sudo choreouser &&\
    chmod +x index.js web &&\
    npm install

CMD [ "node", "index.js" ]

USER 10555
