package app.werwoelfe;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import model.werwoelfe.Daten;
import model.werwoelfe.Spieler;
import model.werwoelfe.SpielerRolle;

@RestController
@RequestMapping(
        value = "/api/werwoelfe")
public class WerwoelfeController {

    @Autowired
    private WerwoelfeService werwoelfeService;

    @GetMapping(
            value = "/daten",
            produces = { MediaType.APPLICATION_JSON_VALUE })
    public Daten getDaten() {

        return werwoelfeService.getDaten();
    }

    @PostMapping(
            value = "/spieler")
    public void setSpieler(@RequestBody List<Spieler> spieler) {

        werwoelfeService.setSpieler(spieler);
    }

    @PostMapping(
            value = "/spielerrolle")
    public void setSpielerRolle(@RequestBody SpielerRolle spielerRolle) {

        werwoelfeService.setSpielerRolle(spielerRolle);
    }

    @PostMapping(
            value = "/fressen")
    public void fressen(@RequestBody String name) {

        werwoelfeService.fressen(name);
    }

    @GetMapping(
            value = "/heilen")
    public void heilen() {

        werwoelfeService.heilen();
    }

    @GetMapping(
            value = "/nichtHeilen")
    public void nichtHeilen() {

        werwoelfeService.nichtHeilen();
    }

    @PostMapping(
            value = "/toeten")
    public void toeten(@RequestBody String name) {

        werwoelfeService.toeten(name);
    }

    @GetMapping(
            value = "/nichtToeten")
    public void nichtToeten() {

        werwoelfeService.nichtToeten();
    }

    @GetMapping(
            value = "/pruefen/{name}")
    public String pruefen(@PathVariable String name) {

        return werwoelfeService.pruefen(name);
    }

    @GetMapping(
            value = "/weiter")
    public void weiter() {

        werwoelfeService.weiter();
    }

    @GetMapping(
            value = "/weiterMagenVerdorben")
    public void weiterMagenVerdorben() {

        werwoelfeService.weiterMagenVerdorben();
    }

    @PostMapping(
            value = "/lynchen")
    public void lynchen(@RequestBody String name) {

        werwoelfeService.lynchen(name);
    }

    @GetMapping(
            value = "/nichtLynchen")
    public void nichtLynchen() {

        werwoelfeService.nichtLynchen();
    }

    @PostMapping(
            value = "/verlieben")
    public void verlieben(@RequestBody String name) {

        werwoelfeService.verlieben(name);
    }

    @GetMapping(
            value = "/neustart")
    public void neustart() {

        werwoelfeService.neustart();
    }
}
