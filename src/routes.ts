import Ascenseur from "./features/ascenseur/ascenseur";
import Atm from "./features/atm/atm";
import AutoEcole from "./features/autoecole/autoecole";
import BagInHead from "./features/bagInHead/bagInHead";
import BlocNote from "./features/BlocNote/BlocNote";
import BoomBox from "./features/BoomBox/BoomBox";
import BoutiqueCustom from "./features/BoutiqueCustom/BoutiqueCustom";
import BoutiqueFA from "./features/Boutique/BoutiqueFA";
import BoutiqueItem from "./features/BoutiqueItem/BoutiqueItem";
import BoutiqueVehicules from "./features/BoutiqueVehicules/BoutiqueVehicules";
import BoutiqueWL from "./features/Boutique/BoutiqueWL";
import CaisseEnregistreuse from "./features/CaisseEnregistreuse/CaisseEnregistreuse";
import CardNewsSocietyCreate from "./features/CardNewsSocietyCreate/cardNewsSocietyCreate";
import CardNewsSocietyShow from "./features/CardNewsSocietyShow/CardNewsSocietyShow";
import Casiers from "./features/casiers/casiers";
import ChoiceInput from "./features/ChoiceInput/ChoiceInput";
import ChoixPersonnage from "./features/ChoixPersonnage/ChoixPersonnage";
import CreateWeazelNews from "./features/WeazelNewsCreate/CreateWeazelNews";
import CreationPersonnage from "./features/CreationPersonnage/CreationPersonnage";
import CrewCreateMenu from "./features/crewCreateMenu/CrewCreateMenu";
import CrewMenuGestion from "./features/crewMenuGestion/crewMenuGestion";
import DeathScreen from "./features/deathscreen/deathscreen";
import Dj from "./features/dj/dj";
import Fuelstation from "./features/fuelstation/fuelstation";
import GaragePublique from "./features/GaragePublique/GaragePublique";
import GestionPropriete from "./features/GestionPropriete/GestionPropriete";
import GestionVariables from "./features/GestionVariables";
import Interaction from "./features/interaction/interaction";
import Inventory from "./features/inventory/inventory";
import InventoryCleaner from "./features/InventoryCleaner/InventoryCleaner";
import JobCenter from "./features/JobCenter/JobCenter";
import KeyboardInput from "./features/KeyboardInput/KeyboardInput";
import Laboratoires from "./features/laboratoires";
import LifeInvader from "./features/LifeInvader/LifeInvader";
import LoadingBar from "./features/loadingBar";
import Mdt from "./features/mdt/mdt";
import MenuAnimalerie from "./features/MenuAnimalerie/MenuAnimalerie";
import MenuBinco from "./features/MenuBinco/MenuBinco";
import MenuBuilder from "./components/MenuBuilder/MenuBuilder";
import MenuCasino from "./features/Menu_casino/Menu_casino";
import MenuCatalogue from "./features/MenuCatalogue/MenuCatalogue";
import MenuCatalogueAchat from "./features/MenuCatalogueAchat/MenuCatalogueAchat";
import MenuDecoration from "./features/MenuDecoration/MenuDecoration";
import MenuEscapeFA from "./features/MenuEscape/MenuEscapeFA";
import MenuEscapeWL from "./features/MenuEscape/MenuEscapeWL";
import MenuGrosCatalogue from "./features/MenuGrosCatalogue/MenuGrosCatalogue";
import MenuGrosCatalogueColor from "./features/MenuGrosCatalogueColor/MenuGrosCatalogueColor";
import MenuJob from "./features/MenuJob/MenuJob";
import MenuK9 from "./features/MenuK9/MenuK9";
import MenuLTD from "./features/MenuLTD/MenuLTD";
import MenuMasques from "./features/MenuMasques/MenuMasques";
import MenuMetier from "./features/MenuMetier/MenuMetier";
import MenuObjetsServicesPublics from "./features/MenuObjetsServicesPublics/MenuObjetsServicesPublics";
import MenuPinceACheveux from "./features/MenuPinceACheveux/MenuPinceACheveux";
import MenuPlaque from "./features/MenuPlaque/MenuPlaque";
import MenuPostOPStock from "./features/MenuPostOPStock/MenuPostOPStock";
import MenuPostOp from "./features/MenuPostOp/MenuPostOp";
import MenuPreBinco from "./features/MenuPreBinco/MenuPreBinco";
import MenuProgress from "./features/MenuProgress/MenuProgress";
import MenuSecuroserv from "./features/MenuSecuroserv";
import MenuStockEntreprise from "./features/MenuStockEntreprise/MenuStockEntreprise";
import MenuTerritoire from "./features/MenuTerritoire/MenuTerritoire";
import MenuVehicule from "./features/MenuVehicule/MenuVehicule";
import MenuVestiaire from "./features/MenuVestiaire/MenuVestiaire";
import Menu_Television from "./features/Menu_Television/Menu_television";
import Menu_habitation from "./features/Menu_habitation/Menu_habitation";
import Menu_propriete from "./features/Menu_propriete/Menu_propriete";
import Menu_propriete_alt from "./features/Menu_propriete_alt/Menu_propriete_alt";
import NurseMenu from "./features/NurseMenu/NurseMenu";
import OrderConfirmation from "./features/OrderConfirmation/OrderConfirmation";
import PPA from "./features/PPA/";
import Papiers from "./features/Papiers/Papiers";
import PermisConduire from "./features/PermisConduire/PermisConduire";
import PoliceID from "./features/policeID";
import Progressbar from "./features/progressbar/progressbar";
import RadialMenus from "./features/RadialMenus/RadialMenus";
import Radio from "./features/radio/radio";
import RightCaseBuilder from "./features/RightCaseBuilder/RightCaseBuilder";
import { SERVER } from "./config";
import ScratchingTicket from "./features/ScratchingTicket";
import ShopPacks from "./features/ShopPacks/ShopPacks";
import SubPremium from "./features/SubPremium/SubPremium";
import SubPremiumPlus from "./features/SubPremiumPlus/SubPremiumPlus";
import SubSubscriber from "./features/SubSubscriber/SubSubscriber";
import Surgery from "./features/Surgery/Surgery";
import Tablette from "./features/tablette/tablette";
import TabletteIllegale from "./features/TabletteIllegale/TabletteIllegale";
import WipeConfirm from "./features/WipeConfirm/WipeConfirm";

const routes = [
	{
		path: "NurseMenu",
		component: NurseMenu,
	},
	{
		path: "PPA",
		component: PPA,
	},
	{
		path: "SubPremiumPlus",
		component: SubPremiumPlus,
	},
	{
		path: "SubSubscriber",
		component: SubSubscriber,
	},
	{
		path: "LoadingBar",
		component: LoadingBar,
	},
	{
		path: "CaisseEnregistreuse",
		component: CaisseEnregistreuse,
	},
	{
		path: "Dj",
		component: Dj,
	},
	{
		path: "ScratchingTicket",
		component: ScratchingTicket,
	},
	{
		path: "policeID",
		component: PoliceID,
	},
	{
		path: "GestionVariables",
		component: GestionVariables,
	},
	{
		path: "MenuCasino",
		component: MenuCasino,
	},
	{
		path: "RightCaseBuilder",
		component: RightCaseBuilder,
	},
	{
		path: "MenuJob",
		component: MenuJob,
	},
	{
		path: "WipeConfirm",
		component: WipeConfirm,
	},
	{
		path: "ChoiceInput",
		component: ChoiceInput,
	},
	{
		path: "InventoryCleaner",
		component: InventoryCleaner,
	},
	{
		path: "LifeInvader",
		component: LifeInvader,
	},
	{
		path: "MenuBuilder",
		component: MenuBuilder,
	},
	{
		path: "BoutiqueVehicules",
		component: BoutiqueVehicules,
	},
	{
		path: "MenuTerritoire",
		component: MenuTerritoire,
	},
	{
		path: "GaragePublique",
		component: GaragePublique,
	},
	{
		path: "Surgery",
		component: Surgery,
	},
	{
		path: "OrderConfirmation",
		component: OrderConfirmation,
	},
	{
		path: "KeyboardInput",
		component: KeyboardInput,
	},
	{
		path: "BoutiqueItem",
		component: BoutiqueItem,
	},
	{
		path: "SubPremium",
		component: SubPremium,
	},
	{
		path: "JobCenter",
		component: JobCenter,
	},
	{
		path: "MenuPreBinco",
		component: MenuPreBinco,
	},
	{
		path: "MenuPlaque",
		component: MenuPlaque,
	},
	{
		path: "MenuK9",
		component: MenuK9,
	},
	{
		path: "BoutiqueCustom",
		component: BoutiqueCustom,
	},
	{
		path: "Boutique",
		component: SERVER === "FA" ? BoutiqueFA : BoutiqueWL,
	},
	{
		path: "MenuEscape",
		component: SERVER === "FA" ? MenuEscapeFA : MenuEscapeWL,
	},
	{
		path: "ShopPacks",
		component: ShopPacks,
	},
	{
		path: "MenuProgress",
		component: MenuProgress,
	},
	{
		path: "MenuObjetsServicesPublics",
		component: MenuObjetsServicesPublics,
	},
	{
		path: "MenuAnimalerie",
		component: MenuAnimalerie,
	},
	{
		path: "gestionpropriete",
		component: GestionPropriete,
	},
	{
		path: "BlocNote",
		component: BlocNote,
	},
	{
		path: "PermisConduire",
		component: PermisConduire,
	},
	{
		path: "ChoixPersonnage",
		component: ChoixPersonnage,
	},
	{
		path: "CreationPersonnage",
		component: CreationPersonnage,
	},
	{
		path: "MenuVestiaire",
		component: MenuVestiaire,
	},
	{
		path: "MenuDecoration",
		component: MenuDecoration,
	},
	{
		path: "MenuMetier",
		component: MenuMetier,
	},
	{
		path: "MenuPostOp",
		component: MenuPostOp,
	},
	{
		path: "MenuProprieteAlt",
		component: Menu_propriete_alt,
	},
	{
		path: "MenuStockEntreprise",
		component: MenuStockEntreprise,
	},
	{
		path: "MenuPostOPStock",
		component: MenuPostOPStock,
	},
	{
		path: "Papier",
		component: Papiers,
	},
	{
		path: "Tablette",
		component: TabletteIllegale,
	},
	{
		path: "MenuMasques",
		component: MenuMasques,
	},
	{
		path: "RadialMenu",
		component: RadialMenus,
	},
	{
		path: "MenuBinco",
		component: MenuBinco,
	},
	{
		path: "MenuCatalogueAchat",
		component: MenuCatalogueAchat,
	},
	{
		path: "MenuGrosCatalogueColor",
		component: MenuGrosCatalogueColor,
	},
	{
		path: "MenuLTD",
		component: MenuLTD,
	},
	{
		path: "MenuVehicule",
		component: MenuVehicule,
	},
	{
		path: "MenuCatalogue",
		component: MenuCatalogue,
	},
	{
		path: "Menu_propriete",
		component: Menu_propriete,
	},
	{
		path: "Menu_habitation",
		component: Menu_habitation,
	},
	{
		path: "MenuPinceACheveux",
		component: MenuPinceACheveux,
	},
	{
		path: "CardNewsSocietyCreate",
		component: CardNewsSocietyCreate,
	},
	{
		path: "CardNewsSocietyShow",
		component: CardNewsSocietyShow,
	},
	{
		path: "CreateWeazelNews",
		component: CreateWeazelNews,
	},
	{
		path: "laboratoires",
		component: Laboratoires,
	},
	{
		path: "Menu_Television",
		component: Menu_Television,
	},
	{
		path: "BoomBox",
		component: BoomBox,
	},
	{
		path: "Interaction",
		component: Interaction,
	},
	{
		path: "atm",
		component: Atm,
	},
	{
		path: "fuelstation",
		component: Fuelstation,
	},
	{
		path: "MenuGrosCatalogue",
		component: MenuGrosCatalogue,
	},
	{
		path: "Progressbar",
		component: Progressbar,
	},
	{
		path: "Deathscreen",
		component: DeathScreen,
	},
	{
		path: "inventory",
		component: Inventory,
	},
	{
		path: "radio",
		component: Radio,
	},
	{
		path: "MenuSecuroserv",
		component: MenuSecuroserv,
	},
	{
		path: "Casiers",
		component: Casiers,
	},
	{
		path: "mdt",
		component: Mdt,
	},
	{
		path: "autoecole",
		component: AutoEcole,
	},
	{
		path: "tablette",
		component: Tablette,
	},
	{
		path: "CrewCreateMenu",
		component: CrewCreateMenu,
	},
	{
		path: "CrewMenuGestion",
		component: CrewMenuGestion,
	},
	{
		path: "bagInHead",
		component: BagInHead,
	},
	{
		path: "ascenseur",
		component: Ascenseur,
	},
].sort((a, b) => {
	if (a.path < b.path) {
		return -1;
	}
	if (a.path > b.path) {
		return 1;
	}
	return 0;
});

export { routes };
