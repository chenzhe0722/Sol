# Sol
Sol is a portal demo project.  
Sol是一个门户网站样例工程。  

## Repository Management 仓库管理
Branch "master" is used for important functional integration. However, it is usually behind the distribution.  
master分支用于记录重要提交，通常是整合了多个功能后的发布。其往往落后于发布在线上的版本。  

Branch "ci" is used for distribution. Configuration files of this branch are required for deployment.  
ci分支用于发布部署容器，在进行实例部署时，需要使用该分支的配置文件。  

Branch "dev" is for testing or experiment, which are probably unstable and not buildable.  
dev分支用于实验性功能、开发测试的提交，很可能不稳定或不可构建。  

## Standalone Mode Deployment 单实例部署
Please checkout to branch "ci" first.  
请先切换到ci分支。  

[Docker Compose](https://docs.docker.com/compose/install/) is required. Please refer to official documentation.  
部署需要依赖于[Docker Compose](https://docs.docker.com/compose/install/)，请根据官方指引进行安装。  

Download the configuration file [docker-compose.yml](docker/sol/docker-compose.yml) and run the command below in shell or powershell. Please replace the variable according to configuration file path.  
下载配置文件[docker-compose.yml](docker/sol/docker-compose.yml)，并在shell或者powershell中运行以下命令，请根据配置文件的路径自行替换变量。  

```
docker-compose -f ${COMPOSE_CONF} up -d
```

Visit http://localhost/ in browser after services begin.  
部署完毕后，在 http://localhost/ 中访问服务。  
