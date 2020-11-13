Function Apply-Kube(${KubeDir} ${KubeConf}) {
  foreach(${Conf} in Get-Content "${PSScriptRoot}\${KubeConf}") {
    kubectl apply -f "${PSScriptRoot}\${KubeDir}\${Conf}"
  }
}

Apply-Kube "main" "main.conf"
Apply-Kube ${args}[0] "mode.conf"
