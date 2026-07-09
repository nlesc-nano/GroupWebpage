export type ResearchArea = {
	title: string;
	kicker: string;
	description: string;
	methods: string[];
};

export type Project = {
	title: string;
	description: string;
	application: string;
	status: string;
	link?: string;
	linkLabel?: string;
	tags?: string[];
};

export type Person = {
	name: string;
	role: string;
	focus: string;
};

export type ProfileLink = {
	label: string;
	href: string;
};

export type Logo = {
	name: string;
	src: string;
	alt: string;
};

export type SoftwareResource = {
	name: string;
	description: string;
	link: string;
	linkLabel: string;
	tags: string[];
};

export type NewsItem = {
	date: string;
	title: string;
	description: string;
};

export const group = {
	name: 'Computational and Predictive Nanochemistry Group',
	shortName: 'InfanteLab',
	logoMark: 'IL',
	tagline:
		'We develop computational methods, artificial intelligence, and open software to understand and accelerate the discovery of colloidal quantum dots, bridging atomistic simulations with data-driven materials design.',
	pi: 'Prof. Ivan Infante',
	title: 'Ikerbasque Research Professor',
	affiliation: 'BCMaterials, Basque Center for Materials, Applications and Nanostructures',
	location: 'UPV/EHU Science Park, Leioa, Spain',
	email: 'ivan.infante@bcmaterials.net',
	address:
		'BCMaterials, Basque Center for Materials, Applications and Nanostructures, UPV/EHU Science Park, 48940 Leioa (Bizkaia), Spain',
	description:
		'InfanteLab develops computational nanochemistry, artificial intelligence, and digital platforms for realistic colloidal quantum dots and semiconductor nanocrystals.',
	heroNote:
		'We welcome collaborations across theory, simulation, synthesis, spectroscopy, device physics, and data-driven materials discovery.'
};

export const logos: Logo[] = [
	{
		name: 'BCMaterials',
		src: '/logos/bcmaterials-logo.png',
		alt: 'BCMaterials logo'
	},
	{
		name: 'Ikerbasque',
		src: '/logos/ikerbasque-logo.jpg',
		alt: 'Ikerbasque logo'
	}
];

export const researchAreas: ResearchArea[] = [
	{
		title: 'Artificial Intelligence for Quantum Dot Discovery',
		kicker: 'AI-accelerated nanocrystal design',
		description:
			'We develop next-generation artificial intelligence methodologies that enable atomistic simulations of realistic quantum dots at unprecedented length and time scales. By combining active learning, universal machine-learning force fields, and digital-twin concepts, we accelerate the discovery and optimization of semiconductor nanocrystals for optoelectronics, sensing, photocatalysis, and quantum technologies.',
		methods: ['Machine Learning Force Fields', 'Active Learning', 'Digital Twins']
	},
	{
		title: 'Atomistic Modelling of Colloidal Quantum Dots',
		kicker: 'Realistic models from atoms to properties',
		description:
			'We develop realistic atomistic models of semiconductor quantum dots to understand how finite size, crystal structure, composition, and surface chemistry determine their electronic and optical properties. Our work combines first-principles electronic structure methods with molecular dynamics simulations to bridge theory and experiment across a broad range of semiconductor nanocrystals.',
		methods: ['Density Functional Theory', 'Molecular Dynamics', 'Electronic Structure']
	},
	{
		title: 'Surface Chemistry and Heterostructured Nanocrystals',
		kicker: 'Interfaces, ligands, defects, and traps',
		description:
			'The surface ultimately determines the performance of colloidal quantum dots. We investigate ligand binding, surface reconstructions, oxidation, defects, and core/shell interfaces to understand and engineer trap states, charge localization, and excitonic properties. Our research spans II-VI, III-V, IV-VI, and halide perovskite nanocrystals with a strong focus on realistic atomistic models.',
		methods: ['Surface Chemistry', 'Core/Shell Quantum Dots', 'Interface Engineering']
	},
	{
		title: 'Scientific Software and Digital Platforms',
		kicker: 'Open tools for computational nanochemistry',
		description:
			'Our group develops computational software that enables reproducible, accessible, and scalable simulations of colloidal quantum dots. We build tools covering the entire computational workflow, from atomistic model generation and electronic structure analysis to machine-learning training and cloud-based digital platforms, helping transform computational nanochemistry into an open and data-driven discipline.',
		methods: ['Scientific Software', 'Computational Workflows', 'Open Science']
	}
];

export const projects: Project[] = [
	{
		title: 'QuantumDotSpace',
		description:
			'An integrated cloud platform for constructing, simulating, visualising, and designing colloidal quantum dots using first-principles simulations and artificial intelligence.',
		application: 'Digital materials discovery',
		status: 'Active',
		link: 'https://www.quantumdotspace.org',
		linkLabel: 'Open platform',
		tags: ['Cloud platform', 'Visualisation', 'AI design']
	},
	{
		title: 'Orchestr.AI',
		description:
			'A machine-learning framework for developing universal force fields for semiconductor quantum dots through active learning, uncertainty quantification, and large-scale molecular dynamics simulations.',
		application: 'AI-driven atomistic simulations',
		status: 'Active',
		link: 'https://github.com/nlesc-nano/Orchestr.AI',
		linkLabel: 'View repository',
		tags: ['ML force fields', 'Active learning', 'HPC workflows']
	},
	{
		title: 'QD Builder',
		description:
			'An automated platform for generating realistic atomistic models of colloidal quantum dots, including crystal structure, morphology, ligand passivation, surface reconstruction, and heterostructures.',
		application: 'Atomistic model generation',
		status: 'Active',
		link: 'https://github.com/nlesc-nano/QD_Builder',
		linkLabel: 'View repository',
		tags: ['Wulff construction', 'Core-shell models', 'Ligand passivation']
	},
	{
		title: 'miniBSE',
		description:
			'A computational package for post-processing electronic structure calculations of finite quantum dots. The software enables efficient analysis of optical transitions, excitonic properties, transition dipoles, and excited-state characteristics.',
		application: 'Optical spectroscopy and excited-state analysis',
		status: 'Active',
		link: 'https://github.com/nlesc-nano/miniBSE',
		linkLabel: 'View repository',
		tags: ['Optical transitions', 'Excitonic properties', 'Finite QDs']
	},
	{
		title: 'Large-scale atomistic simulations with classical force fields',
		description:
			'We continue to use classical force-field simulations to study realistic, large colloidal quantum dots beyond the length and time scales accessible to first-principles methods. The auto-FOX engine supports force-field construction through potential-energy-surface descriptors, structural analysis, and Monte Carlo parameter optimization.',
		application: 'Large-scale molecular dynamics',
		status: 'Active',
		link: 'https://github.com/nlesc-nano/auto-FOX',
		linkLabel: 'View auto-FOX',
		tags: ['Classical force fields', 'PES descriptors', 'Large QDs']
	},
	{
		title: 'Origin of trap states in colloidal quantum dots',
		description:
			'We investigate how surface defects, ligand binding, oxidation, reconstructions, and core/shell interfaces create or suppress trap states. The goal is to connect atomistic structure with charge localization, excitonic properties, and photoluminescence losses in realistic quantum dots.',
		application: 'Surface electronic structure',
		status: 'Active',
		tags: ['Surface defects', 'Charge localization', 'Photoluminescence']
	}
];

export const people: Person[] = [
	{
		name: 'Prof. Ivan Infante',
		role: 'Principal Investigator',
		focus: 'Ikerbasque Research Professor at BCMaterials'
	},
	{
		name: 'Vikas Kumar',
		role: 'Postdoc',
		focus: 'ML force fields development for low bandgap materials'
	},
	{
		name: 'Zain Ul Abideen',
		role: 'PhD student',
		focus: 'Developer of the Orchestr.AI platform'
	},
	{
		name: 'Abdessamad El Adel',
		role: 'PhD student',
		focus: 'Atomistic large-scale simulations of quantum dots'
	},
	{
		name: 'Shehla Gul',
		role: 'PhD student',
		focus: 'Electronic structure of quantum dots'
	},
	{
		name: 'Masuma Suleymanova',
		role: 'PhD student',
		focus: 'MLFF and active learning of CdSe quantum dots'
	},
	{
		name: 'Uxman Mohammed',
		role: 'PhD student',
		focus: 'MLFF and universal ML models of quantum dots'
	},
	{
		name: 'Camilo Rodriguez Quintero',
		role: 'PhD student',
		focus: 'Developing ML models for reactive quantum dots'
	}
];

export const alumni: Person[] = [
	{
		name: 'Jordi Llusar',
		role: 'Postdoc',
		focus: 'Electronic structure and surface traps of core-only and core-shell quantum dots'
	},
	{
		name: 'Mario Fernandez-Pendas',
		role: 'Postdoc',
		focus: 'Developer of the Orchestr.AI platform'
	},
	{
		name: 'Roberta Pascazio',
		role: 'PhD student',
		focus: 'Atomistic large-scale simulations of quantum dots'
	},
	{
		name: 'Juliette Zito',
		role: 'PhD student',
		focus: 'Electronic structure of quantum dots'
	},
	{
		name: 'Francesco Zaccaria',
		role: 'Postdoc',
		focus: 'Electronic structure of quantum dots'
	},
	{
		name: 'Urko Petralanda',
		role: 'Postdoc',
		focus: 'Electronic structure of quantum dots'
	},
	{
		name: 'Stephanie ten Brinck',
		role: 'PhD student',
		focus: 'Electronic structure of quantum dots'
	}
];

export const profiles: ProfileLink[] = [
	{ label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=fw_Uyi4AAAAJ&hl=en' },
	{ label: 'ORCID', href: 'https://orcid.org/0000-0003-3467-9376' },
	{ label: 'BCMaterials', href: 'https://www.bcmaterials.net/en/people' },
	{ label: 'Ikerbasque', href: 'https://www.ikerbasque.net/es/ivan-infante' },
	{ label: 'GitHub', href: 'https://github.com/nlesc-nano/' },
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/ivaninfante/' },
	{ label: 'X', href: 'https://x.com/ivaninfante76' }
];

export const news: NewsItem[] = [
	{
		date: 'Jul 2026',
		title: 'QDLab website draft launched',
		description:
			'A first version of the Computational Quantum Dot Nanochemistry Group webpage is ready for content refinement.'
	},
	{
		date: '2026',
		title: 'QuantumDotSpace and AI-driven quantum dot discovery',
		description:
			'Replace this item with a precise project launch, grant, collaboration, or platform announcement.'
	},
	{
		date: '2025',
		title: 'Selected quantum dot publications highlighted',
		description:
			'The publication section now uses the Scopus BibTeX export and highlights selected quantum dot papers.'
	}
];

export const software: SoftwareResource[] = [
	{
		name: 'QuantumDotSpace',
		description:
			'Cloud platform for constructing, simulating, visualising, and designing colloidal quantum dots with first-principles simulations and artificial intelligence. It is the public-facing environment for connecting model construction, simulation workflows, and AI-assisted materials discovery.',
		link: 'https://www.quantumdotspace.org',
		linkLabel: 'Open platform',
		tags: ['Cloud platform', 'First-principles workflows', 'AI design']
	},
	{
		name: 'Orchestr.AI',
		description:
			'Unified, modular, engine-agnostic framework for training machine-learning force fields for quantum dots. It supports multiple ML engines, including SchNet, PaiNN, SO3net, FieldSchNet, NequIP, Allegro, and MACE, with workflows for preprocessing, training, inference, benchmarking, and HPC execution.',
		link: 'https://github.com/nlesc-nano/Orchestr.AI',
		linkLabel: 'GitHub repository',
		tags: ['SchNet / PaiNN', 'NequIP / Allegro', 'MACE', 'SLURM workflows']
	},
	{
		name: 'QD Builder',
		description:
			'Python package for building and passivating atomistic quantum-dot models from CIF files. It supports Wulff and spherical cuts, core-shell particles, facet-specific surface energies, coordination-aware ligand passivation, charge-balance logic, and experimental Janus heterostructure workflows.',
		link: 'https://github.com/nlesc-nano/QD_Builder',
		linkLabel: 'GitHub repository',
		tags: ['Wulff cuts', 'Core-shell QDs', 'Janus structures', 'Ligand passivation']
	},
	{
		name: 'miniBSE',
		description:
			'Post-processing package for electronic structure calculations of finite quantum dots and excited-state analysis.',
		link: 'https://github.com/nlesc-nano/miniBSE',
		linkLabel: 'GitHub repository',
		tags: ['Optical transitions', 'Excitons', 'Transition dipoles']
	},
	{
		name: 'auto-FOX',
		description:
			'Automated Forcefield Optimization Extension for analyzing potential energy surfaces and constructing force-field parameters. The toolkit includes multi-XYZ trajectory handling, RDF/ADF, RMSD/RMSF, shell-structure descriptors for nanocrystals, and Monte Carlo force-field parameter optimization.',
		link: 'https://github.com/nlesc-nano/auto-FOX',
		linkLabel: 'GitHub repository',
		tags: ['PES analysis', 'RDF / ADF', 'Shell descriptors', 'Force-field optimization']
	}
];

export const openQuestions = [
	'Individual profile URLs for current members and alumni, if desired',
	'Current group member and alumni photos',
	'Recent news items, grants, talks, openings, or collaborations'
];
