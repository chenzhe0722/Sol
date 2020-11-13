# Sol
Sol is a portal demo project.  
Sol是一个门户网站样例工程。  

## Repository 仓库
Branch "master" is used for important functional integration. However, it is usually behind the distribution.  
master分支用于记录重要提交，通常是整合了多个功能后的发布。其往往落后于发布在线上的版本。  

Branch "ci" is used for distribution. Configuration files of this branch are required for deployment.  
ci分支用于发布部署容器，在进行实例部署时，需要使用该分支的配置文件。  

Branch "dev" is for testing or experiment, which are probably unstable and not buildable.  
dev分支用于实验性功能、开发测试的提交，很可能不稳定或不可构建。  

## Deployment 部署
Please checkout to branch "ci" first.  
请先切换到ci分支。  

[Kubernetes](https://kubernetes.io/docs/tasks/tools/) and [Ingress Controller](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/) are required. Please refer to official documentation.  
部署需要依赖于[Kubernetes](https://kubernetes.io/docs/tasks/tools/)和[Ingress Controller](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/)，请根据官方指引进行部署。  

Clone this repository, enter the root of directory, run the command below with appropriate mode. Currently "standalone" and "cluster" mode are available. Note that you need privilege to run the command.  
克隆本仓库，进入文件夹目录，并根据你需要的启动模式运行以下命令，目前“standalone”和“cluster”模式是可用的。请注意你可能需要系统权限才能运行这些命令。  

Shell
```
kubernetes/sol/run ${MODE}
```

Powershell
```
kubernetes\sol\run.ps1 ${Mode}
```

Use command below to check the exposed address of Kubernetes Ingress resource.  
使用以下命令查看暴露的Kubernetes Ingress资源的地址。  

```
kubectl get ingress -n sol portal
```

Configure the domain "sol.xeno" on the address of Ingress, and visit http://sol.xeno/ in browser after configuration.  
配置域名“sol.xeno”与Ingress暴露地址之间的映射，并在 http://sol.xeno/ 中访问服务。  
