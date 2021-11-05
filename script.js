const app = new PIXI.Application({width:1680,height:720});
document.body.appendChild(app.view);

if (new URL(window.location.href).searchParams.has("noscissor"))
	app.renderer.mask.enableScissor = false;

console.log("scissor masking enabled:",app.renderer.mask.enableScissor);

const colors = [0xe77025,0xdd9821,0xc8bb2f,0xacd43f,0x97da50,0x7ed172,0x5fc18e,0x50aaa1,0x4c94aa,0x5281a6,0x5f6e99,0x695b8c,0x6e4a81];

const gap = 4;
const size = 40;
const cols = 2;

const createB = ()=>{
	const outer = new PIXI.Container();
	const bg = outer.addChild(new PIXI.Sprite(PIXI.Texture.WHITE));
	bg.tint = 0x555555;
	bg.width = 192;
	bg.height = 192;
	
	for (let i = 0; i < 4; i++)
	{
		const c = outer.addChild(new PIXI.Container());
		c.x = (i%cols)*(size+gap);
		c.y = Math.floor(i/cols)*(size+gap);
		const s2 = c.addChild(new PIXI.Sprite(PIXI.Texture.WHITE));
		s2.tint = colors[i%colors.length];
		s2.width = 200;
		s2.height = 200;
		s2.mask = c.addChild(new PIXI.Graphics())
			.beginFill(0xff0000,1)
			.drawRect(0,0,size,size)
			.endFill();
	}
	return outer;
}

const createA = ()=>{
	const a = new PIXI.Container();
	a.mask = a.addChild(new PIXI.Graphics())
		.beginFill(0xff0000,1)
		.drawRect(0,0,192,576)
		.endFill();
	
	//1 outside mask (top) - breaks
	for (let i = 0; i < 4; i++)
		a.addChild(createB()).y = -192 + (i * 192);

	//2 outside mask (top and bottom) - breaks
	//for (let i = 0; i < 5; i++)
	//	a.addChild(createB()).y = -192 + (i * 192);

	//3 completely within mask - doesn't break
	//for (let i = 0; i < 3; i++)
	//	a.addChild(createB()).y = i * 192;
		
	return a;
};

//needs at least 4 to break
for (let i = 0; i < 4; i++)
{
	const a = app.stage.addChild(createA());
	a.x = 40 + (i * 200);
	a.y = 40;
}

console.log("start");