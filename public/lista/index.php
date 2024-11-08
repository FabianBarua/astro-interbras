<?php
// Nombre del archivo
$filename = '../lista.txt';

// Verificar si el archivo existe
if (file_exists($filename)) {
    // Configurar cabeceras para la descarga
    header('Content-Description: File Transfer');
    header('Content-Type: text/plain');
    header('Content-Disposition: attachment; filename="' . basename($filename) . '"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($filename));

    // Limpiar el buffer de salida
    ob_clean();
    flush();

    // Leer el archivo y enviarlo al usuario
    readfile($filename);
    exit;
} else {
    echo "El archivo no existe.";
}
?>
