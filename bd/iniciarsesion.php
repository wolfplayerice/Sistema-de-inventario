<?php   
    session_start();
    include_once '../bd/conexion.php';
    $objeto = new Conexion();
    $conexion = $objeto ->Conectar();

    if (isset($_POST['usuario']) && isset($_POST['clave']) ) {

    function validate($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    $usuario = validate($_POST['usuario']); 
    $clave = validate($_POST['clave']);

    if (empty($usuario)) {
        header("Location: ../vistas/login.php?error=El Usuario es Requerido");
        exit();
    }elseif (empty($clave)) {
        header("Location: ../vistas/login.php?error=La clave es Requerida");
        exit();
    }else{

        // $Clave = md5($Clave);

        $sql = "SELECT * FROM usuarios WHERE usuario = :usuario AND clave=:clave";
        $stmt = $conexion->prepare($sql);
        $stmt->bindValue(':usuario', $usuario);
        $stmt->bindValue(':clave', $clave);
        $stmt->execute();

        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

            if ($row['usuario'] === $usuario && $row['clave'] === $clave) {
                $_SESSION['usuario'] = $row['usuario'];
                $_SESSION['nombreusuario'] = $row['nombreusuario'];
                $_SESSION['idusuario'] = $row['idusuario'];
                header("Location: ../vistas/index.php");
                exit();
            }else {
                header("Location: ../vistas/login.php?error=El usuario o la clave son incorrectas");
                exit();
            }

        }else {
            header("Location: ../vistas/login.php?error=El usuario o la clave son incorrectas");
            exit();
        }
    }

} else {
    header("Location: ../vistas/login.php");
            exit();
}