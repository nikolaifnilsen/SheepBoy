import android from './img/platform/android.png';
import ios from './img/platform/ios.png';
import nintendo from './img/platform/nintendo-switch.png';
import playstation from './img/platform/playstation.png';
import xbox from './img/platform/xbox-one.png';
import windows from './img/platform/windows.png';
import mac from './img/platform/mac.png';
import linux from './img/platform/linux.png';

// Imports and stores platform icon objects into a grouped object
const PLATFORM_ICONS = {
    ios: {
		src: ios,
		alt: "ios-mobile"
	},

	android: {
		src: android,
		alt: "android-mobile"
	},

	nintendo: {
		src: nintendo,
		alt: "nintendo-platforms"
	},

	playstation: {
		src: playstation,
		alt: "playstation-platforms"
	},

	xbox: {
		src: xbox,
		alt: "xbox-platforms"
	},

	windows: {
		src: windows,
		alt: "windows-os"
	},

	mac: {
		src: mac,
		alt: "mac-os"
	},

	linux: {
		src: linux,
		alt: "linux-os"
	}
}

export default PLATFORM_ICONS;