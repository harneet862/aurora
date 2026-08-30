// Nested tree data for the force-directed diagram (ForceTree.astro).
// Shape: { name, children: [...] } all the way down - matches what
// d3.hierarchy() expects directly, no transformation needed.
//
// Leaf nodes take an optional `icon` slug from https://skillicons.dev
// (see the full list at skillicons.dev) - it's used as
// `https://skillicons.dev/icons?i=<icon>` to fetch a single badge icon.
// Leaves without an `icon` just render as a plain badge with no image.

export default {
    name: 'Me',
    children: [
        {
            name: 'Languages',
            children: [
                { name: 'Python', icon: 'py' },
                { name: 'Java', icon: 'java' },
                { name: 'C/C++', icon: 'cpp' },
                { name: 'JavaScript', icon: 'js' },
                { name: 'TypeScript', icon: 'ts' },
                { name: 'SQL', icon: 'mysql' },
            ],
        },
        {
            name: 'Frontend',
            children: [
                { name: 'HTML', icon: 'html' },
                { name: 'CSS', icon: 'css' },
                { name: 'Astro', icon: 'astro' },
                { name: 'React', icon: 'react' },
            ],
        },
        {
            name: 'Backend',
            children: [
                { name: 'Flask', icon: 'flask' },
                { name: 'Django', icon: 'django' },
                { name: 'Node.js', icon: 'nodejs' },
            ],
        },
        {
            name: 'DevOps',
            children: [
                { name: 'Git', icon: 'git' },
                { name: 'GitHub', icon: 'github' },
                { name: 'Docker', icon: 'docker' },
                { name: 'Linux', icon: 'linux' },
            ],
        },
        {
            name: 'AI/ML',
            children: [
                { name: 'PyTorch', icon: 'pytorch' },
                { name: 'TensorFlow', icon: 'tensorflow' },
                { name: 'scikit-learn', icon: 'sklearn' },
            ],
        },
        {
            name: 'Database',
            children: [
                { name: 'MySQL', icon: 'mysql' },
                { name: 'PostgreSQL', icon: 'postgres' },
                { name: 'MongoDB', icon: 'mongodb' },
                { name: 'Firebase', icon: 'firebase' },
            ],
        },
    ],
};
