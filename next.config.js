const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })

module.exports = withMDX({
    pageExtensions: [
        'js',
        'jsx',
        'mdx'
    ],
    headers: async () => {
        return [
            {
                source: '/api/unreads',
                headers: [
                    {
                        key: 'Access-Control-Allow-Credentials',
                        value: 'true'
                    },
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: 'https://hcb.hackclub.com'
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT,HEAD'
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-CSRF-Token, X-Requested-With, Authorization'
                    }
                ]
            }
        ]
    }
})
