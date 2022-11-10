package model.agentundercover;

import java.util.List;

import com.google.common.collect.Lists;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class Daten {

    private final List<String> orte = Lists.newArrayList(//
            "Bank", //
            "Botschaft", //
            "Casino", //
            "Zug", //
            "Filmstudio", //
            "Firmenfeier", //
            "Flugzeug", //
            "Hotel", //
            "Krankenhaus", //
            "Kreuzfahrtschiff", //
            "Militärbasis", //
            "Piratenschiff", //
            "Polarstation", //
            "Polizeistation", //
            "Restaurant", //
            "Schule", //
            "Strand", //
            "Supermarkt", //
            "Theater", //
            "U-Boot", //
            "Universität", //
            "Wellness-Tempel", //
            "Weltraumstation", //
            "Werkstatt", //
            "Zirkus");

    private List<Spieler> spieler = Lists.newArrayList();
    private Zustand zustand = Zustand.VORBEREITUNG;

    public synchronized void setSpieler(List<Spieler> spieler) {

        this.spieler = spieler;
        this.zustand = Zustand.VORBEREITUNG;
        this.spieler.forEach(p -> {
            p.setRegistriert(false);
            p.setBestaetigt(false);
        });
    }

    public synchronized void registriere(String name) {

        this.spieler.stream().filter(s -> s.getName().equals(name)).findFirst().ifPresent(s -> s.setRegistriert(true));

        if (this.spieler.stream().allMatch(Spieler::isRegistriert)) {
            this.neuerOrt();
        }
    }

    public synchronized void bestaetigeOrt(String name) {

        this.spieler.stream().filter(s -> s.getName().equals(name)).findFirst().ifPresent(s -> s.setBestaetigt(true));
        if (this.spieler.stream().allMatch(Spieler::isBestaetigt)) {
            this.zustand = Zustand.SPIEL;
        }
    }

    public synchronized void neuerOrt() {

        int zufallsort = (int) (Math.random() * orte.size());
        String ort = orte.get(zufallsort);

        int zufallsspieler = (int) (Math.random() * spieler.size());
        for (int i = 0; i < spieler.size(); i++) {
            if (i != zufallsspieler) {
                spieler.get(i).setOrt(ort);
            } else {
                spieler.get(i).setOrt(null);
            }
        }
        this.zustand = Zustand.NEUERORT;
    }

    public synchronized void neustart() {

        this.spieler.forEach(p -> p.setBestaetigt(false));
        this.neuerOrt();
    }
}
