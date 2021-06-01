helm repo add bitnami https://charts.bitnami.com/bitnami
kubectl apply -f "${PSScriptRoot}\init.yaml"
helm install -n sol -f "${PSScriptRoot}\relation.yaml" relation bitnami/postgresql
helm install -n sol -f "${PSScriptRoot}\cache.yaml" cache bitnami/redis-cluster
helm install -n sol auth-portal "${PSScriptRoot}\auth-portal"
helm install -n sol portal "${PSScriptRoot}\portal"
