package app.agentundercover;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import model.agentundercover.Daten;
import model.agentundercover.Spieler;

@RestController
@RequestMapping(
        value = "/api/agentundercover")
public class AgentUndercoverController {

    @Autowired
    private AgentUndercoverService agentUndercoverService;

    @GetMapping(
            value = "/daten",
            produces = { MediaType.APPLICATION_JSON_VALUE })
    public Daten getDaten() {

        return agentUndercoverService.getDaten();
    }

    @PostMapping(
            value = "/spieler")
    public void setSpieler(@RequestBody List<Spieler> spieler) {

        agentUndercoverService.setSpieler(spieler);
    }

    @PostMapping(
            value = "/registriere")
    public void registriere(@RequestBody String name) {

        agentUndercoverService.registriere(name);
    }

    @PostMapping(
            value = "/bestaetigeOrt")
    public void bestaetigeOrt(@RequestBody String name) {

        agentUndercoverService.bestaetigeOrt(name);
    }

    @GetMapping(
            value = "/neustart")
    public void neustart() {

        agentUndercoverService.neustart();
    }
}
