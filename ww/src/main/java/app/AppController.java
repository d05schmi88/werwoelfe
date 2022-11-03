package app;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import model.Daten;
import model.Spieler;
import model.SpielerRolle;

@RestController
@RequestMapping(
        value = "/api")
public class AppController {

    @Autowired
    private DatenService gameDataService;

    @GetMapping(
            value = "/daten",
            produces = { MediaType.APPLICATION_JSON_VALUE })
    public Daten getDaten() {

        return gameDataService.getDaten();
    }

    @PostMapping(
            value = "/spieler")
    public void setSpieler(@RequestBody List<Spieler> spieler) {

        gameDataService.setSpieler(spieler);
    }

    @PostMapping(
            value = "/spielerrolle")
    public void setSpielerRolle(@RequestBody SpielerRolle spielerRolle) {

        gameDataService.setSpielerRolle(spielerRolle);
    }

    @PostMapping(
            value = "/fressen")
    public void fressen(@RequestBody String name) {

        gameDataService.fressen(name);
    }

    @GetMapping(
            value = "/heilen")
    public void heilen() {

        gameDataService.heilen();
    }

    @GetMapping(
            value = "/nichtHeilen")
    public void nichtHeilen() {

        gameDataService.nichtHeilen();
    }

    @PostMapping(
            value = "/toeten")
    public void toeten(@RequestBody String name) {

        gameDataService.toeten(name);
    }

    @GetMapping(
            value = "/nichtToeten")
    public void nichtToeten() {

        gameDataService.nichtToeten();
    }

    @GetMapping(
            value = "/pruefen/{name}")
    public String pruefen(@PathVariable String name) {

        return gameDataService.pruefen(name);
    }

    @GetMapping(
            value = "/weiter")
    public void weiter() {

        gameDataService.weiter();
    }

    @GetMapping(
            value = "/weiterMagenVerdorben")
    public void weiterMagenVerdorben() {

        gameDataService.weiterMagenVerdorben();
    }

    @PostMapping(
            value = "/lynchen")
    public void lynchen(@RequestBody String name) {

        gameDataService.lynchen(name);
    }

    @PostMapping(
            value = "/verlieben")
    public void verlieben(@RequestBody String name) {

        gameDataService.verlieben(name);
    }

    @GetMapping(
            value = "/neustart")
    public void neustart() {

        gameDataService.neustart();
    }
}
