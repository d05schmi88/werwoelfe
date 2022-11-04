package app;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.Getter;
import model.Daten;
import model.Spieler;
import model.SpielerRolle;

@Service
@Getter
public class DatenService {

    public static final String WERWOLF = "Werwolf";
    public static final String AMOR = "Amor";
    public static final String HEXE = "Hexe";
    public static final String SEHERIN = "Seherin";
    public static final String LYKANTROPHIN = "Lykantrophin";
    public static final String AUSSAETZIGE = "Aussätzige";
    public static final String VERFLUCHTER = "Verfluchter";

    private Daten daten = new Daten();

    public void setSpieler(List<Spieler> spieler) {

        this.daten.setSpieler(spieler);
    }

    public void setSpielerRolle(SpielerRolle spielerRolle) {

        this.daten.setSpielerRolle(spielerRolle);
    }

    public void fressen(String name) {

        daten.fressen(name);
        daten.naechsterZustand();
    }

    public void heilen() {

        daten.heilen();
        daten.naechsterZustand();
    }

    public void nichtHeilen() {

        daten.naechsterZustand();
    }

    public void toeten(String name) {

        daten.toeten(name);
        daten.naechsterZustand();
    }

    public void nichtToeten() {

        daten.naechsterZustand();
    }

    public String pruefen(String name) {

        return daten.getGesinnung(name);
    }

    public void weiter() {

        daten.naechsterZustand();
    }

    public void weiterMagenVerdorben() {

        daten.setMagenVerdorben(false);
        daten.naechsterZustand();
    }

    public void lynchen(String name) {

        daten.lynchen(name);
        daten.naechsterZustand();
    }

    public void nichtLynchen() {

        daten.naechsterZustand();
    }

    public void verlieben(String name) {

        daten.setVerliebter(daten.getSpielerVonName(name));
        daten.naechsterZustand();
    }

    public void neustart() {

        daten.neustart();
    }
}
