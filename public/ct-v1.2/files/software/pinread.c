/***************************************************************************************
 * pinread - Read the Pins connected to the switches
 * -----------------------------
 *  This function scans (debounces) the eight switches connected to PortD. It's
 *	extreamly efficient. This function was developed as per a request from
 *	professor Trailor for the ECE473 class for an efficient software debouncing
 *	algorithm.
 *
 **************************************************************************************/
void pinread(void)
{
	static uint8_t trk = 0;			//Used to track button pushes (so we don't keep executing the same
										//instruction while the user is holding the button down)
	uint8_t p1 = 0xFF;					//Dummy variables for debouncing
	uint8_t sw_val = 0;				//-->Contains debounced value of PIND<--
	uint8_t i = 0;						//Dummy counter variable
	
	//This for loop loops 8 times. Once for each pin on PortD.
	for(i=0;i<8;i++)
	{
		//This while() loops loops until a logic 1 or 0 has been read
		//8 times in a row on the current pin.
		while((p1 != 0x01) && (p1 != 0x80))	//Loop until only one '1' is left to be shifted out
		{
			if(PIND & (1<<i))					
				p1 = p1<<1;					//If the Switch read as a logical 1, shift left
			else
				p1 = p1>>1;					//If the Switch read as a logical 0, shift right
		}
		
		if(p1 & 0x01)	//SW = logic 0 (Switch is being pushed)
			sw_val |= (1<<i);
		
		p1 = 0xFF; //reset p1
	}
	
	//At this point, sw_val contains the debounced value of PIND.
	
}