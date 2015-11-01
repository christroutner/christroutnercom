/*************************************************************************************************************
Project : rtc.c
Version : 1.0
Date    : 6/28/04
Author  : Chris Troutner                  
Company : MyRobot                                
Comments: 	This program serves as an example for interfacing the 32.768 Khz Real Time Clock

			This program sets up the Timer/Counter0 to be asyncronisly clocked via the on-board 32.768 Khz
			real time clock (RTC) crystal. Every time the Timer/Counter0 overflows, an interrupt is
			generated. In the interrupt handler the 8-bit unsigned interger 'i' is incremented and
			the lower four bits are output on the LEDs attached to PortB. 
			
			You can adjust the amount of time between interrupts by commenting and uncommenting the
			appropriate lines in the Timer/Counter0 initialization code below.
			
			See Atmel Application note AVR134 for another good example of useing a 37.768Khz RTC chip.
			
Robot Type:			: ModelT
*************************************************************************************************************/

#include <modelt.h>
 
// Declare your global variables here
	uint8_t	i=0;

INTERRUPT(SIG_OVERFLOW0)
{
	i++;
	PORTB = 0x0F & i;
}

int main(void)
{
// Declare your local variables here

// Initialization
	reset();
	
	DDRB = 0x0F;	//Make lower four pins of PortB outputs (LEDs)
	PORTB = 0x00;	//Drive a low (LEDs off)

	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	//********************************
	// Timer0/Counter0 Initialization
	//********************************
	ASSR |= (1<<AS0); 		//set Timer/Counter0 to be asynchronously clocked via the 32.768 Khz Oscillator
	TCNT0=0x00;				// Clear the Counter Buffer (This is where the current count value is stored)
	//---------------------------------------------------------------
	//    TCCR0    	//        Description   	|  Overflow Period 	|
	//---------------------------------------------------------------
	//TCCR0 |= 0x00;// Timer/Counter0 is Stopped| 	 	 -			|
	//TCCR0 |= 0x01;// 		32.768 Khz			| 	1/128 second		|
	//TCCR0 |= 0x02;//		32.768 Khz/8		|	1/8  second		|
	//TCCR0 |= 0x03;//		32.768 Khz/32		|	1/4  second		|
	//TCCR0 |= 0x04;//		32.768 Khz/64		|	1/2  second		|
	  TCCR0 |= 0x05;//		32.768 Khz/128		|	1	 second		|
	//TCCR0 |= 0x06;//		32.768 Khz/256		|	2	 second		|
	//TCCR0 |= 0x07;//		32.768 Khz/1024		|	8	 second		|
	//---------------------------------------------------------------
	// Timer(s)/Counter(s) Interrupt(s) initialization
	TIMSK |= (1<<TOIE0); 	//set 8-bit Timer/Counter0 Overflow
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	
	// Global enable interrupts (Keep this at end of Initialization Section in Main)
	asm volatile ("sei");

	// Loop Forever
	while (1) 
	{

	};
		  
}



