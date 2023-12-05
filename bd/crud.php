<?php
include_once '../bd/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

// Recepción de los datos enviados mediante POST desde el JS   

$nombre_client = (isset($_POST['nombre_client'])) ? $_POST['nombre_client'] : '';
$apellido_client = (isset($_POST['apellido_client'])) ? $_POST['apellido_client'] : '';
$cedula = (isset($_POST['cedula'])) ? $_POST['cedula'] : '';
$tlf_client = (isset($_POST['tlf_client'])) ? $_POST['tlf_client'] : '';
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$idcliente = (isset($_POST['idcliente'])) ? $_POST['idcliente'] : '';

switch($opcion){
    case 1: //alta
        $consulta = "INSERT INTO `cliente` (`idcliente`, `nombre_client`, `apellido_client`, `cedula`, `tlf_client`) VALUES ('$nombre_client', '$apellido_client', '$cedula', '$tlf_client')";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();

        $consulta = "SELECT idcliente, nombre_client, apellido_client, cedula, tlf_client FROM cliente ORDER BY idcliente DESC LIMIT 1";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 2: //modificación
        $consulta = "UPDATE cliente SET nombre_client='$nombre_client', apellido_client='$apellido_client', cedula='$cedula', tlf_client='$tlf_client'  WHERE idcliente='$idcliente' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        
        $consulta = "SELECT idcliente, nombre_client, apellido_client, cedula, tlf_client FROM cliente WHERE idcliente='$idcliente' ";       
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;        
    case 3://baja
        $consulta = "DELETE FROM cliente WHERE idcliente='$idcliente'";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                           
        break;        
}

print json_encode($data, JSON_UNESCAPED_UNICODE); //enviar el array final en formato json a JS
$conexion = NULL;
