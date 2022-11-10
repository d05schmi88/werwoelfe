package model.werwoelfe;

import static java.util.stream.Collectors.toList;

import java.util.ArrayList;
import java.util.List;

import com.google.common.base.Objects;
import com.google.common.collect.Lists;

import app.werwoelfe.WerwoelfeService;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Daten {

    private List<Spieler> spieler = new ArrayList<>();
    private List<String> registrierungen = new ArrayList<>();

    private Zustand zustand = Zustand.VORBEREITUNG;

    private List<Opfer> opfer = Lists.newArrayList();

    private List<Spieler> werwoelfe = Lists.newArrayList();

    private Spieler hexe = null;
    private boolean hatGeheilt = false;
    private boolean hatGetoetet = false;

    private Spieler seherin = null;
    private Spieler lykantrophin = null;

    private boolean verliebt = false;
    private Spieler amor = null;
    private Spieler verliebter = null;

    private Spieler aussaetzige = null;
    private boolean magenVerdorben = false;

    private Spieler verfluchter = null;
    private boolean umgewandelt = false;

    public synchronized void setSpielerRolle(SpielerRolle spielerRolle) {

        Spieler s = getSpielerVonName(spielerRolle.getName());
        if (Objects.equal(spielerRolle.getRolle(), WerwoelfeService.WERWOLF)) {
            this.werwoelfe.add(s);
        } else if (Objects.equal(spielerRolle.getRolle(), WerwoelfeService.HEXE)) {
            this.hexe = s;
        } else if (Objects.equal(spielerRolle.getRolle(), WerwoelfeService.SEHERIN)) {
            this.seherin = s;
        } else if (Objects.equal(spielerRolle.getRolle(), WerwoelfeService.AMOR)) {
            this.amor = s;
        } else if (Objects.equal(spielerRolle.getRolle(), WerwoelfeService.VERFLUCHTER)) {
            this.verfluchter = s;
        } else if (Objects.equal(spielerRolle.getRolle(), WerwoelfeService.AUSSAETZIGE)) {
            this.aussaetzige = s;
        } else if (Objects.equal(spielerRolle.getRolle(), WerwoelfeService.LYKANTROPHIN)) {
            this.lykantrophin = s;
        }

        registrierungen.add(s.getName());
        if (alleRegistriert(registrierungen, spieler)) {
            this.zustand = Zustand.NACHT;
        }
    }

    private synchronized boolean alleRegistriert(List<String> registrierungen, List<Spieler> spieler) {

        if (registrierungen.size() != spieler.size()) {
            return false;
        }

        for (Spieler s : spieler) {
            if (!registrierungen.contains(s.getName())) {
                return false;
            }
        }

        return true;
    }

    public synchronized Spieler getSpielerVonName(String name) {

        return spieler.stream().filter(p -> Objects.equal(p.getName(), name)).findFirst().orElseThrow();
    }

    public synchronized void fressen(String name) {

        Spieler s = getSpielerVonName(name);

        /** Verfluchter */
        umgewandelt = false;
        if (verfluchter != null && Objects.equal(name, verfluchter.getName())) {

            umgewandelt = true;
            werwoelfe.add(s);
            return;
        }

        s.setSollSterben(true);

        /** Aussätzige */
        if (aussaetzige != null && Objects.equal(name, aussaetzige.getName())) {
            magenVerdorben = true;
        }
    }

    public synchronized void heilen() {

        Spieler geheilter = spieler.stream().filter(Spieler::isSollSterben).findFirst().orElseThrow();
        this.hatGeheilt = true;
        geheilter.setSollSterben(false);

        /** Aussätzige */
        if (aussaetzige != null && Objects.equal(geheilter.getName(), aussaetzige.getName())) {
            this.magenVerdorben = false;
        }
    }

    public synchronized void toeten(String name) {

        this.hatGetoetet = true;
        Spieler player = getSpielerVonName(name);
        player.setSollSterben(true);
    }

    public synchronized void lynchen(String name) {

        Spieler player = getSpielerVonName(name);
        player.setSollSterben(true);
    }

    public synchronized void naechsterZustand() {

        if (zustand == Zustand.NACHT) {
            if (amor != null && !verliebt) {
                zustand = Zustand.AMOR;
                this.verliebt = true;
            } else {
                zustand = Zustand.WERWOLF;
            }
        } else if (zustand == Zustand.AMOR) {
            zustand = Zustand.VERLIEBEN;
        } else if (zustand == Zustand.VERLIEBEN) {
            zustand = Zustand.WERWOLF;
        } else if (zustand == Zustand.WERWOLF) {
            zustand = Zustand.WERWOLF_ENDE;
        } else if (zustand == Zustand.WERWOLF_ENDE) {
            if (hexe != null) {
                zustand = Zustand.HEXE_HEILEN;
            } else if (seherin != null) {
                zustand = Zustand.SEHERIN;
            } else {
                aktualisiereOpfer();
                zustand = Zustand.DORF_ERWACHT;
            }
        } else if (zustand == Zustand.HEXE_HEILEN) {
            zustand = Zustand.HEXE_TOETEN;
        } else if (zustand == Zustand.HEXE_TOETEN) {
            zustand = Zustand.HEXE_ENDE;
        } else if (zustand == Zustand.HEXE_ENDE) {
            if (seherin != null) {
                zustand = Zustand.SEHERIN;
            } else {
                aktualisiereOpfer();
                zustand = Zustand.DORF_ERWACHT;
            }
        } else if (zustand == Zustand.SEHERIN) {
            zustand = Zustand.SEHERIN_ENDE;
        } else if (zustand == Zustand.SEHERIN_ENDE) {
            aktualisiereOpfer();
            zustand = Zustand.DORF_ERWACHT;
        } else if (zustand == Zustand.DORF_ERWACHT) {
            if (zaehleWerwoelfe() == 0) {
                zustand = Zustand.DORF_GEWONNEN;
            } else if (zaehleWerwoelfe() > zaehleDorf()) {
                zustand = Zustand.WERWOLF_GEWONNEN;
            } else {
                zustand = Zustand.TAG;
            }
        } else if (zustand == Zustand.TAG) {
            aktualisiereOpfer();
            zustand = Zustand.TAG_ENDE;
        } else if (zustand == Zustand.TAG_ENDE) {
            if (zaehleWerwoelfe() == 0) {
                zustand = Zustand.DORF_GEWONNEN;
            } else if (zaehleWerwoelfe() > zaehleDorf()) {
                zustand = Zustand.WERWOLF_GEWONNEN;
            } else {
                zustand = Zustand.NACHT;
            }
        }
    }

    public synchronized String getGesinnung(String name) {

        if (werwoelfe.stream().anyMatch(w -> Objects.equal(w.getName(), name))
                || (lykantrophin != null && Objects.equal(name, lykantrophin.getName()))) {
            return "Böse";
        } else {
            return "Gut";
        }
    }

    private synchronized long zaehleWerwoelfe() {

        return werwoelfe.stream().filter(Spieler::isLebend).count();
    }

    private synchronized int zaehleDorf() {

        int count = 0;
        for (Spieler player : spieler.stream().filter(Spieler::isLebend).toList()) {
            if (!werwoelfe.contains(player)) {
                count++;
            }
        }
        return count;
    }

    private synchronized void aktualisiereOpfer() {

        opfer = spieler.stream().filter(Spieler::isSollSterben) //
                .map(p -> new Opfer(p.getName(), getGesinnung(p.getName()))).collect(toList());

        if (amor != null && verliebter != null) {
            for (Opfer o : Lists.newArrayList(opfer)) {
                if (Objects.equal(o.getName(), amor.getName())
                        && opfer.stream().noneMatch(v -> Objects.equal(v.getName(), verliebter.getName()))) {
                    opfer.add(new Opfer(verliebter.getName(), getGesinnung(verliebter.getName())));
                } else if (Objects.equal(o.getName(), verliebter.getName())
                        && opfer.stream().noneMatch(v -> Objects.equal(v.getName(), amor.getName()))) {
                    opfer.add(new Opfer(amor.getName(), getGesinnung(amor.getName())));
                }
            }
        }

        opfer.forEach(o -> getSpielerVonName(o.getName()).setLebend(false));
        spieler.forEach(p -> p.setSollSterben(false));
    }

    public synchronized void neustart() {

        this.zustand = Zustand.VORBEREITUNG;
        this.spieler.forEach(p -> {
            p.setLebend(true);
            p.setSollSterben(false);
        });
        this.registrierungen.clear();
        this.werwoelfe.clear();
        this.opfer.clear();

        this.hexe = null;
        this.hatGeheilt = false;
        this.hatGetoetet = false;

        this.seherin = null;
        this.lykantrophin = null;

        this.verliebt = false;
        this.amor = null;
        this.verliebter = null;

        this.aussaetzige = null;
        this.magenVerdorben = false;

        this.verfluchter = null;
        this.umgewandelt = false;
    }
}
