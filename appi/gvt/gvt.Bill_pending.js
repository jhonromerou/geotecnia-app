


$M.liAdd('ivt',[ //Itf.DT
	{url:'itfDT.gvtSdn', ac:'itfDT.mas', t:'Entrega de Venta (DT)', mdlActives:'itfMas', func:function(){
			$M.Ht.ini({g:function(){
					Itf.DT.form({text:'Documento Entrega de Venta',api:Api.Gvt.pr+'dt/sdn',helpFie:'Y',fileName:'entregaventa',descrip:'Se genera un nuevo documento y se actualizan las cantidades en el inventario',
						divL:[
							{divLine:1,L:'Serie',req:'Y',wxn:'wrapx4',I:{tag:'select',name:'serieId',opts:$Tb.docSerie['gvtSdn']}},
							{L:'Fecha',req:'Y',wxn:'wrapx4',I:{lTag:'date',name:'docDate'}},
							{L:'Almacen',req:'Y',wxn:'wrapx4',I:{lTag:'select',name:'whsId',opts:$Tb.itmOwhs}},
							{L:'Id tercero',req:'Y',wxn:'wrapx4',I:{lTag:'number',name:'cardId'}},
							{divLine:1,L:'Detalles',wxn:'wrapx1',I:{lTag:'input',name:'lineMemo'}},
						],
						Li:[
							{t:'itemCode',d:'Código de Artículo',len:[1,20],req:'Y'},
							{t:'itemSzId',d:'Código S/P',req:'Y',opts:$V.grs1,optsTb:1},
							{t:'quantity',d:'Cantidad',req:'Y',xformat:'number'}
						]
					});
				}
			});
		}},
]);
