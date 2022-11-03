export class DesktopGuardService {

    static isDesktop() {

        return window.innerWidth > 500;
    }
}