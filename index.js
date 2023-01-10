const express = require('express')
const fetch = require('node-fetch')
const { verifyKeyMiddleware } = require('discord-interactions')

const app = express()

app.post('/interactions', verifyKeyMiddleware(process.env.public_key), async(req, res) => {

    const interaction = req.body

    await fetch(`https://discord.com/api/interactions/${interaction.id}/${interaction.token}/callback`, {
				method: "POST",
				headers: {
					"Authorization": `Bot ${process.env.token}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					type: 5,
					data: {
						flags: 64
					}
				})
			})

    if (Interaction.data.custom_id == `verify`) {
        await fetch(`https://discord.com/api/guilds/${interaction.guild_id}/members/${interaction.member.user.id}/roles/1042687123725221918`, {
			method: "PUT",
			headers: {
				"Authorization": `Bot ${process.env.token}`
			}
		})

		await fetch(`https://discord.com/api/webhooks/${interaction.application_id}/${interaction.token}/messages/@original`, {
			method: "PATCH",
			headers: {
				"Authorization": `Bot ${process.env.token}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				content: "Granted You Access to the Server."
			})
		})
			
		res.sendStatus(200)
    }
})

app.listen("3000", () => console.log('server is running'))
