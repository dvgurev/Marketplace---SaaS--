# Infrastructure

Инфраструктура как код (IaC), файлы конфигурации для облака/серверов и
скрипты развёртывания.

Содержит Terraform/CloudFormation/Ansible-манифесты, Kubernetes-манифайлы,
настройки CI/CD, Docker-Compose для локального тестирования.

## Примерная структура

```
infra/
├── terraform/        # модули и конфигурации Terraform
├── k8s/              # YAML-манифайлы для Kubernetes
├── ansible/          # playbook’и для управления серверами
├── ci/               # конфиг CI (GitHub Actions, GitLab CI, etc.)
└── README.md
```

## Развёртывание

```
cd infra/terraform && terraform init && terraform apply
```

или при использовании Kubernetes:

```
kubectl apply -f infra/k8s/
```
