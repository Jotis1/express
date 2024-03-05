param(
    [string]$e,
    [string]$p
)

if (-not $e -or -not $pwd) {
    Write-Host "Se requieren el correo electrónico y la contraseña."
    exit 1
}

$contenido = "Correo electronico: $e`nContrasena: $p"

$archivo = "credenciales.txt"

$archivoCompleto = Join-Path -Path $PWD -ChildPath $archivo

$contenido | Out-File -FilePath $archivoCompleto

Write-Host "Se han escrito las credenciales en $archivoCompleto"
