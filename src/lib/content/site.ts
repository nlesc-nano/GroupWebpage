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
	photo?: string;
};

export type ProfileLink = {
	label: string;
	href: string;
};

export type Logo = {
	name: string;
	src: string;
	alt: string;
	href?: string;
};

export type SoftwareResource = {
	name: string;
	description: string;
	link: string;
	linkLabel: string;
	tags: string[];
	logo?: string;
};

export type NewsItem = {
	date: string;
	title: string;
	description: string;
};

export const group = {
	name: 'Computational and Predictive Nanochemistry Group',
	shortName: 'InfanteLab',
	logo: '/logos/infantelab-header.png',
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

// Formbricks setup for the collaboration contact form (Settings -> Workspace for
// workspaceId/apiHost; each question's "Question ID" is under Advanced Settings on
// its card in the survey editor).
export const contactForm = {
	apiHost: 'https://app.formbricks.com',
	workspaceId: 'cmrnne0jz53y701wxnai3lez9',
	surveyId: 'cmrnnkbai54w301wx3pqu6sgn',
	// Contact Info card: answer is an ordered array [firstName, lastName, email, phone, company].
	contactInfoQuestionId: 'fri028sai593dn234lecdsmf',
	// Open-text "Message" question.
	messageQuestionId: 'j53itwm31kmennccbdfn4f3w'
};

export const logos: Logo[] = [
	{
		name: 'BCMaterials',
		src: '/logos/bcmaterials-logo.png',
		alt: 'BCMaterials logo',
		href: 'https://www.bcmaterials.net/en/research/research-lines/computational-materials-science'
	},
	{
		name: 'Ikerbasque',
		src: '/logos/ikerbasque-logo.jpg',
		alt: 'Ikerbasque logo',
		href: 'https://www.ikerbasque.net/en/ivan-infante'
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
		title: 'AI-accelerated quantum dot discovery',
		description:
			'We develop active-learning strategies and transferable machine-learning force fields that extend realistic quantum-dot simulations to experimentally relevant sizes and time scales.',
		application: 'Predictive materials design',
		status: 'Active',
		tags: ['Active learning', 'Universal ML potentials', 'Uncertainty quantification']
	},
	{
		title: 'Realistic surfaces, defects, and trap states',
		description:
			'We connect ligand binding, oxidation, surface reconstruction, and under-coordinated sites with charge localization, non-radiative losses, and photoluminescence efficiency.',
		application: 'Surface electronic structure',
		status: 'Active',
		tags: ['Surface chemistry', 'Trap states', 'Photoluminescence']
	},
	{
		title: 'Core/shell and heterostructured nanocrystals',
		description:
			'We investigate how composition, morphology, strain, interfaces, and ligand environments control carrier confinement and excited-state properties in complex nanocrystals.',
		application: 'Interface engineering',
		status: 'Active',
		tags: ['Core/shell QDs', 'Heterostructures', 'Excited states']
	},
	{
		title: 'Digital twins for colloidal nanomaterials',
		description:
			'We connect reproducible atomistic construction, simulation, analysis, and data-driven optimization in digital workflows designed to bridge computational predictions and experiment.',
		application: 'Open computational nanochemistry',
		status: 'Active',
		tags: ['Digital twins', 'Reproducible workflows', 'Theory–experiment bridge']
	}
];

export const people: Person[] = [
	{
		name: 'Prof. Ivan Infante',
		role: 'Principal Investigator',
		focus: 'Ikerbasque Research Professor at BCMaterials',
		photo: '/photos/ivan-infante.jpg'
	},
	{
		name: 'Vikas Kumar',
		role: 'Postdoc',
		focus: 'ML force fields development for low bandgap materials',
		photo: '/photos/vikas-kumar.jpg'
	},
	{
		name: 'Zain Ul Abideen',
		role: 'PhD student',
		focus: 'Developer of the Orchestr.AI platform',
		photo: '/photos/zain-ul-abideen.jpg'
	},
	{
		name: 'Abdessamad El Adel',
		role: 'PhD student',
		focus: 'Atomistic large-scale simulations of quantum dots',
		photo: '/photos/abdessamad-el-adel.jpg'
	},
	{
		name: 'Shehla Gul',
		role: 'PhD student',
		focus: 'Electronic structure of quantum dots',
		photo: '/photos/shehla-gul.jpg'
	},
	{
		name: 'Masuma Suleymanova',
		role: 'PhD student',
		focus: 'MLFF and active learning of CdSe quantum dots',
		photo: '/photos/masuma-suleymanova.jpg'
	},
	{
		name: 'Muhammad Usman',
		role: 'PhD student',
		focus: 'MLFF and universal ML models of quantum dots',
		photo: '/photos/uxman-mohammed.jpg'
	},
	{
		name: 'Camilo Rodriguez Quintero',
		role: 'PhD student',
		focus: 'Developing ML models for reactive quantum dots',
		photo: '/photos/camilo-rodriguez-quintero.jpg'
	}
];

export const alumni: Person[] = [
	{
		name: 'Jordi Llusar',
		role: 'Postdoc',
		focus: 'Electronic structure and surface traps of core-only and core-shell quantum dots',
		photo: '/photos/jordi-llusar.jpg'
	},
	{
		name: 'Mario Fernandez-Pendas',
		role: 'Postdoc',
		focus: 'Developer of the Orchestr.AI platform',
		photo: '/photos/mario-fernandez-pendas.jpg'
	},
	{
		name: 'Roberta Pascazio',
		role: 'PhD student',
		focus: 'Atomistic large-scale simulations of quantum dots',
		photo: '/photos/roberta-pascazio.jpg'
	},
	{
		name: 'Juliette Zito',
		role: 'PhD student',
		focus: 'Electronic structure of quantum dots',
		photo: '/photos/juliette-zito.jpg'
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
		focus: 'Electronic structure of quantum dots',
		photo: '/photos/stephanie-ten-brinck.jpg'
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
		title: 'InfanteLab research website launched',
		description:
			'Our new group website brings together current research programmes, open scientific software, team profiles, and the publication record in one place.'
	},
	{
		date: '2026',
		title: 'QuantumDotSpace platform launched',
		description:
			'The QuantumDotSpace cloud platform for AI-accelerated quantum dot discovery is now publicly available, enabling collaborative model construction and simulation workflows.'
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
		tags: ['Cloud platform', 'First-principles workflows', 'AI design'],
		logo: '/logos/quantumdotspace-web.png'
	},
	{
		name: 'Orchestr.AI',
		description:
			'Unified, modular, engine-agnostic framework for training machine-learning force fields for quantum dots. It supports multiple ML engines, including SchNet, PaiNN, SO3net, FieldSchNet, NequIP, Allegro, and MACE, with workflows for preprocessing, training, inference, benchmarking, and HPC execution.',
		link: 'https://github.com/nlesc-nano/Orchestr.AI',
		linkLabel: 'GitHub repository',
		tags: ['SchNet / PaiNN', 'NequIP / Allegro', 'MACE', 'SLURM workflows'],
		logo: '/logos/orchestrai-web.png'
	},
	{
		name: 'QD Builder',
		description:
			'Python package for building and passivating atomistic quantum-dot models from CIF files. It supports Wulff and spherical cuts, core-shell particles, facet-specific surface energies, coordination-aware ligand passivation, charge-balance logic, and experimental Janus heterostructure workflows.',
		link: 'https://github.com/nlesc-nano/QD_Builder',
		linkLabel: 'GitHub repository',
		tags: ['Wulff cuts', 'Core-shell QDs', 'Janus structures', 'Ligand passivation'],
		logo: '/logos/qd-builder-web.png'
	},
	{
		name: 'miniBSE',
		description:
			'Post-processing package for electronic structure calculations of finite quantum dots and excited-state analysis.',
		link: 'https://github.com/nlesc-nano/miniBSE',
		linkLabel: 'GitHub repository',
		tags: ['Optical transitions', 'Excitons', 'Transition dipoles'],
		logo: '/logos/minibse-web.png'
	},
	{
		name: 'auto-FOX',
		description:
			'Automated Forcefield Optimization Extension for analyzing potential energy surfaces and constructing force-field parameters. The toolkit includes multi-XYZ trajectory handling, RDF/ADF, RMSD/RMSF, shell-structure descriptors for nanocrystals, and Monte Carlo force-field parameter optimization.',
		link: 'https://github.com/nlesc-nano/auto-FOX',
		linkLabel: 'GitHub repository',
		tags: ['PES analysis', 'RDF / ADF', 'Shell descriptors', 'Force-field optimization'],
		logo: '/logos/auto-fox-web.png'
	},
	{
		name: 'miniCAT',
		description:
			'Lightweight tool for attaching chemical ligands to nanocrystal and quantum-dot surfaces directly from SMILES strings. It uses RDKit-based functional-group detection to anchor ligands on dummy sites, with configurable multi-ligand, multi-pass passivation ratios and spatial distributions.',
		link: 'https://github.com/nlesc-nano/miniCAT',
		linkLabel: 'GitHub repository',
		tags: ['SMILES ligands', 'RDKit', 'Multi-pass passivation', 'Surface anchoring'],
		logo: '/logos/mini-cat-web.png'
	}
];
