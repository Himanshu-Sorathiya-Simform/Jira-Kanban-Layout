const users = new Map([
	[
		'person1',
		'https://i2-prod.mirror.co.uk/incoming/article5614456.ece/ALTERNATES/s1227b/PAY-Lee-Griggs.jpg',
	],
	['person2', 'https://thumbs.dreamstime.com/b/square-portrait-1784254.jpg'],
	[
		'person3',
		'https://img.freepik.com/premium-photo/face-portrait-casual-middleaged-man-white-square-background-generative-ai_741672-1331.jpg?w=2000',
	],
	[
		'person4',
		'https://tse3.mm.bing.net/th/id/OIP.r4b0T2uRLrCNgHKZ7lXzjwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
	],
]);

const tasks = [
	{
		id: '1',
		name: 'person1',
		title: 'Optimize mobile web performance for checkout flow',
		tag: 'Billing',
		status: 'todo',
		priority: 'medium',
		description:
			'Analyze and reduce the bundle size of the checkout page. Focus on lazy loading heavy payment modules to improve Time to Interactive (TTI).',
		dueDate: '2024-05-15',
		reporter: 'manager1',
	},
	{
		id: '2',
		name: 'person2',
		title: 'Implement onboarding flow for travel booking users',
		tag: 'Accounts',
		status: 'todo',
		priority: 'medium',
		description:
			'Develop a 3-step guided tour for new users. This should cover profile setup, preference selection, and the first search walkthrough.',
		dueDate: '2024-05-18',
		reporter: 'person3',
	},
	{
		id: '3',
		name: 'person1',
		title: 'Design multi-destination search interface for mobile',
		tag: 'Accounts',
		status: 'todo',
		priority: 'high',
		description:
			'Create high-fidelity mockups for adding up to 5 destinations in a single trip flow. Ensure the "remove destination" button is thumb-friendly.',
		dueDate: '2024-05-12',
		reporter: 'person4',
	},
	{
		id: '4',
		name: 'person1',
		title: 'Integrate billing system with third-party APIs',
		tag: 'Forms',
		status: 'todo',
		priority: 'high',
		description:
			'Connect the backend to Stripe and PayPal APIs. Securely handle webhooks for subscription renewal and payment failures.',
		dueDate: '2024-05-20',
		reporter: 'manager1',
	},
	{
		id: '5',
		name: 'person3',
		title: 'Enhance account linking for repeat travel users',
		tag: 'Accounts',
		status: 'todo',
		priority: 'low',
		description:
			'Allow users to link multiple social media accounts for faster login. Investigate OAuth2 implementation for Apple ID.',
		dueDate: '2024-06-01',
		reporter: 'person2',
	},
	{
		id: '6',
		name: 'person2',
		title: 'Create dynamic forms for onboarding workflow',
		tag: 'Forms',
		status: 'todo',
		priority: 'medium',
		description:
			'Build a reusable form engine that renders inputs based on a JSON schema. Must support validation and conditional logic.',
		dueDate: '2024-05-22',
		reporter: 'person1',
	},
	{
		id: '7',
		name: 'person1',
		title: 'Refactor mobile UI components for faster rendering',
		tag: 'Billing',
		status: 'inProgress',
		priority: 'high',
		description:
			'Replace heavy CSS-in-JS patterns with optimized Tailwind classes in the billing dashboard to reduce script execution time.',
		dueDate: '2024-05-10',
		reporter: 'person4',
	},
	{
		id: '8',
		name: 'person4',
		title: 'Fix validation issues in travel onboarding forms',
		tag: 'Forms',
		status: 'inProgress',
		priority: 'medium',
		description:
			'Fix a bug where the "Submit" button stays disabled even when all fields are valid. Related to the date-picker state management.',
		dueDate: '2024-05-09',
		reporter: 'person2',
	},
	{
		id: '9',
		name: 'person2',
		title: 'Improve search accuracy for multi-city queries',
		tag: 'Accounts',
		status: 'inProgress',
		priority: 'high',
		description:
			'Update the search algorithm to prioritize direct flight paths when users select more than two cities.',
		dueDate: '2024-05-14',
		reporter: 'manager1',
	},
	{
		id: '10',
		name: 'person3',
		title: 'Review feedback on onboarding experience',
		tag: 'Feedback',
		status: 'inReview',
		priority: 'medium',
		description:
			'Synthesize the results from the April user testing group. Identify the top 3 friction points in the registration process.',
		dueDate: '2024-05-08',
		reporter: 'person1',
	},
	{
		id: '11',
		name: 'person4',
		title: 'Test edge cases for search UI responsiveness',
		tag: 'Accounts',
		status: 'inReview',
		priority: 'high',
		description:
			'Verify search result card layouts on iPhone SE and Galaxy Fold. Ensure text does not overflow on narrow screens.',
		dueDate: '2024-05-07',
		reporter: 'person3',
	},
	{
		id: '12',
		name: 'person3',
		title: 'Validate feedback module integration with backend',
		tag: 'Feedback',
		status: 'inReview',
		priority: 'low',
		description:
			'Ensure that user comments submitted through the mobile app are correctly stored in the Feedback table with the correct metadata.',
		dueDate: '2024-05-15',
		reporter: 'person4',
	},
	{
		id: '13',
		name: 'person4',
		title: 'Audit billing-related UI components for consistency',
		tag: 'Billing',
		status: 'inReview',
		priority: 'medium',
		description:
			'Check that all currency displays follow the international formatting standard. Verify button colors match the brand style guide.',
		dueDate: '2024-05-06',
		reporter: 'manager1',
	},
	{
		id: '14',
		name: 'person1',
		title: 'Finalize and deploy onboarding feature to production',
		tag: 'Feedback',
		status: 'done',
		priority: 'high',
		description:
			'Run final smoke tests in the staging environment. Coordinate with DevOps for the blue-green deployment schedule.',
		dueDate: '2024-05-05',
		reporter: 'person2',
	},
];

export { tasks, users };
