<?php
include_once '../bd/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$usuario = (isset($_POST['usuario'])) ? $_POST['usuario'] : '';
$clave = (isset($_POST['clave'])) ? $_POST['clave'] : '';
$nombreusuario = (isset($_POST['nombreusuario'])) ? $_POST['nombreusuario'] : '';
$idrol = (isset($_POST['idrol'])) ? $_POST['idrol'] : '';
$nombrerol = (isset($_POST['nombrerol'])) ? $_POST['nombrerol'] : '';



$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$idusuario = (isset($_POST['idusuario'])) ? $_POST['idusuario'] : '';


switch($opcion){
    case 1:
        $consulta = "INSERT INTO usuarios (usuario, clave, nombreusuario, idrol) VALUES('$usuario', '$clave', '$nombreusuario', '$idrol') ";			
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(); 
        
        $consulta = "SELECT * FROM usuarios ORDER BY idusuario DESC LIMIT 1";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);       
        break;    
    case 2:        
        $consulta = "UPDATE `usuarios` SET `usuario` = '$usuario', `clave` = '$clave', `nombreusuario` = '$nombreusuario', `idrol`='$idrol' WHERE `idusuario` = $idusuario";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        
        $consulta = "SELECT * FROM usuarios WHERE idusuario='$idusuario' ";       
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3:        
        $consulta = "DELETE FROM usuarios WHERE idusuario='$idusuario' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                           
        break;
    case 4:    
        $consulta = "SELECT usuarios.idusuario, usuarios.usuario, usuarios.clave, usuarios.nombreusuario, rol.nombrerol FROM usuarios INNER JOIN rol ON usuarios.idrol = rol.idrol";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE);//envio el array final el formato json a AJAX
$conexion=null;