/******************************************************************************************
Project : led_but.c
Version : v1.1 for AVR-GCC
Date    : 10/30/2003
Author  : Chris Troutner                  
Company : MyRobot
Chip	: ATMEGA128
Platform: Model-T Prototype
Comments: This program shows how to control the LEDs and switches on the Mini-PC. 


Clock frequency     : 16.0000 MHz
Memory model        : Small
Internal SRAM size  : 4096
External SRAM size  : 0
Data Stack size     : 1024
******************************************************************************************/

//Compiler Derectives
	
	//Includes
	#include <modelt.h>	
	
	//Defines
	/*By defining a string constant as is done here, the string is stored in program memory rather than loaded
	into RAM at run time. The ATMega128 has 128KB of program memory and only 4KB of RAM, so it is much better
	to store strings in this way if possible. The catch is that strings stored in program memory can't be
	manipulated (efficiently) durring run time.*/
	#define SW1MSG "Switch 1"
	#define SW2MSG "Switch 2"
	#define SW3MSG "Switch 3"
	#define SW4MSG "Switch 4"

//Global Variables
	char t[16]; 

//Sub-Function Prototypes

//Interrupt Handlers
	
	INTERRUPT(SIG_INTERRUPT0) 
	{
		//REMEMBER: SET UP FOR Falling EDGE
		asm volatile ("cli"); //Disable global interrupts while servicing this interrupt.
		ms_spin(20);			//Wait 20ms to let mechanical oscilations to die down.
		
		strcpy(t, SW3MSG);		//Send a message to the LCD
		line1(t);
		
		led(1,2000);			//Turn on LED1 for 2 seconds (2000 mS).
		
		clr_lcd();				//Clear the lcd.
		
		EIFR |= 0x0F;			//Clear all the interrupt flags. This instruction makes it so that you
								//can't trigger an interrupt from another button until the first button's
								//interrupt routine has been serviced.
								
		asm volatile ("sei");	//Re-enable global interrupts
	}
	
	INTERRUPT(SIG_INTERRUPT1) 
	{	
		//REMEMBER: SET UP FOR Falling EDGE
		asm volatile ("cli"); //Disable global interrupts while servicing this interrupt.
		ms_spin(20);			//Wait 20ms to let mechanical oscilations to die down.
		
		strcpy(t, SW4MSG);		//Send a message to the LCD
		line1(t);
		
		led(1,2000);			//Turn on LED1 for 2 seconds (2000 mS).
		
		clr_lcd();				//Clear the lcd.
		
		EIFR |= 0x0F;			//Clear all the interrupt flags. This instruction makes it so that you
								//can't trigger an interrupt from another button until the first button's
								//interrupt routine has been serviced.
								
		asm volatile ("sei");	//Re-enable global interrupts		
	}
	
	INTERRUPT(SIG_INTERRUPT2) 
	{
		//REMEMBER: SET UP FOR Falling EDGE
		asm volatile ("cli"); //Disable global interrupts while servicing this interrupt.
		ms_spin(20);			//Wait 20ms to let mechanical oscilations to die down.
		
		strcpy(t, SW2MSG);		//Send a message to the LCD
		line1(t);
		
		led(1,2000);			//Turn on LED1 for 2 seconds (2000 mS).
		
		clr_lcd();				//Clear the lcd.
		
		EIFR |= 0x0F;			//Clear all the interrupt flags. This instruction makes it so that you
								//can't trigger an interrupt from another button until the first button's
								//interrupt routine has been serviced.
								
		asm volatile ("sei");	//Re-enable global interrupts		
	}
	
	INTERRUPT(SIG_INTERRUPT3) 
	{	
		//REMEMBER: SET UP FOR Falling EDGE
		asm volatile ("cli"); //Disable global interrupts while servicing this interrupt.
		ms_spin(20);			//Wait 20ms to let mechanical oscilations to die down.
		
		strcpy(t, SW1MSG);		//Send a message to the LCD
		line1(t);
		
		led(1,2000);			//Turn on LED1 for 2 seconds (2000 mS).
		
		clr_lcd();				//Clear the lcd.
		
		EIFR |= 0x0F;			//Clear all the interrupt flags. This instruction makes it so that you
								//can't trigger an interrupt from another button until the first button's
								//interrupt routine has been serviced.
								
		asm volatile ("sei");	//Re-enable global interrupts		
	}

//Main
int main(void)
	{
	//Local Variables
	
	//Initialization
		reset();
		
		lcd_init();
	
		//				PERIPHERIAL AND INTERRUPT INITIALIZATION
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		//****************************************************************
		// 				 External Interrupt 0-3 Initialization
		//****************************************************************
		EICRA=0xAA;		//Set INT0-3 to trigger by a falling edge. (pg. 86 of M128 datasheet)
		EICRB=0x00;		//This controlls INT4-7. (pg. 87 of M128 datasheet)
		EIMSK=0x0F;		//Enable INT0-3 interrupts (Turn them on). (pg. 88 of M128 datasheet)
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	
	
	//Enable global interrupts (Keep this instruction at the end of initialization).
		asm volatile ("sei");
	
	//Main Execution Code
		while (1) 
		{
	
		};
	}



