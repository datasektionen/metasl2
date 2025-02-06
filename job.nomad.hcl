job "metasl2" {
  type = "service"

  group "metasl2" {
    network {
      port "http" { }
    }

    service {
      name     = "metasl2"
      port     = "http"
      provider = "nomad"
      tags = [
        "traefik.enable=true",
        "traefik.http.routers.metasl2.rule=Host(`sl.datasektionen.se`)",
        "traefik.http.routers.metasl2.tls.certresolver=default",
      ]
    }

    task "metasl2" {
      driver = "docker"

      config {
        image = var.image_tag
        ports = ["http"]
      }

      template {
        data        = <<ENV
PORT={{ env "NOMAD_PORT_http" }}
ENV
        destination = "local/.env"
        env         = true
      }

      resources {
        memory = 50
      }
    }
  }
}

variable "image_tag" {
  type = string
  default = "ghcr.io/datasektionen/metasl2:latest"
}
