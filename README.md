# update code 
## local side
```bash 
git add .
```
```bash
git commit -m ""
```
```bash
git push origin master
```
## server side
```bash
cd jpm-backend
```
```bash
docker-compose down
```
```bash
git pull
```
```bash
docker-compose up -d --build
```
### view log api
```bash
docker logs -f {container name}
```
### check docker container
```bash 
docker ps -a
```
### remove container
```bash 
docker rm -f {id container}
```
