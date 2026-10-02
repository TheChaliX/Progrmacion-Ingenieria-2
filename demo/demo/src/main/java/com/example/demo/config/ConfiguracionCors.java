package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuracion de CORS para el desarrollo con React Native.
 *
 * POR QUE HACE FALTA
 *
 * Cuando la app de Expo corre en el NAVEGADOR (tecla w en la terminal de
 * Expo), la pagina se sirve desde http://localhost:8081 y los pedidos van
 * a http://localhost:8080. Para el navegador son dos origenes distintos,
 * asi que aplica la politica de mismo origen: recibe la respuesta pero se
 * niega a entregarsela al codigo, salvo que el servidor autorice
 * explicitamente ese origen.
 *
 * Esa autorizacion es un encabezado HTTP: Access-Control-Allow-Origin.
 * Esta clase le dice a Spring que lo mande.
 *
 * CUANDO NO HACE FALTA
 *
 * Cuando la app corre en el celular con Expo Go, o en un emulador. Ahi no
 * hay navegador ni politica de mismo origen: el pedido sale por la red
 * nativa del sistema operativo y CORS no interviene.
 *
 * DONDE VA ESTE ARCHIVO
 *
 *   src/main/java/ar/edu/ies9233/holamundo/configuracion/ConfiguracionCors.java
 *
 * El paquete "configuracion" es nuevo: hay que crearlo.
 *
 * NOTA PARA PRODUCCION
 *
 * El "*" de allowedOrigins significa "cualquier origen". Para la cursada
 * esta bien, porque el puerto de Expo puede cambiar si el 8081 esta
 * ocupado. En una aplicacion real se lista el dominio del front y nada
 * mas, por ejemplo: .allowedOrigins("https://miapp.com")
 */
@Configuration
public class ConfiguracionCors implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
