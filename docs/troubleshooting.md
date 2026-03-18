# Troubleshooting Notes

## Container name conflict
Use:

```bash
docker ps -a
docker stop <name>
docker rm <name>
NGINX default page appears

Check:
docker exec -it compose-demo-nginx sh
cat /etc/nginx/nginx.conf
docker exec -it compose-demo-nginx nginx -T
Compose file not found

Run commands in the project directory.
