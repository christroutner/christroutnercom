/*********************************************
Project : buz_example.c
Version : v1.1 for AVR-GCC
Date    : 10/30/2003
Author  : Chris Troutner                  
Company : MyRobot
Chip	: ATMEGA128
Platform: Model-T Prototype
Comments: This program was the first successful test program for controlling the onboard ADC. After 
			initializing the LCD, it constantly reads ADC3 (PORTF.3) which is the Battery voltage 
			reference and displays the battery voltage on the LCD. This function uses the ADC 
			interupt. It also uses AVCC (PIN 64) as the voltage reference.


Clock frequency     : 16.0000 MHz
Memory model        : Small
Internal SRAM size  : 4096
External SRAM size  : 0
Data Stack size     : 1024
*********************************************/

#include <modelt.h>

#define	DT	2000

INTERRUPT(SIG_OUTPUT_COMPARE0) {
//local variables

	PORTE ^= 0x08;

}

//Main
	int main(void)
	{
	
	//Local Variables
		char		lcdstr[16];		//Variable to store a string we want to display on the LCD. 
									//Makeing this a local.
									//variable is more efficient than a global variable.
	
	reset();						//Initialize the microcontroller.
	
	lcd_init();						//Initialize the LCD
	
	ms_spin(100);					//Wait for 100 mS to allow power to stablize.
	
	//PERIPHERIAL AND INTERUPT INITIALIZATION//
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	//****************************************************************
	// 				 Timer0/Counter0 Initialization
	//****************************************************************
	ASSR=0x00;		// Clock source: System Clock.
	TCCR0=0x0D;		// Clock value: 16Mhz / 64 = 250Khz (4 uS period) - And set Bit 4 to clear 
					//TCNT0 when it equals OCR0.
	TCNT0=0x00;		// Make sure counter buffer is clear.
	OCR0=0xFA;		// Set Compare interrupt when OCR0 = TCNT0 = 250 (0xFA in hex).	
					//(Interrupt occurs every 1 mS)
//	OCR0=0x7D;		// Set Compare interrupt when OCR0 = TCNT0 = 125 (0x7D in hex). 
					//(Interrupt occurs every 500 nS)

	// Timer(s)/Counter(s) Interrupt(s) initialization
	TIMSK=0x02;		//Counter0 Compare Match Interrupt Enabled.
	ETIMSK=0x00;	//No other Timer/Coutners are used.
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

	DDRE = 0x08;	//Turn on PE3 for buzzer driving.
	
	// Global enable interrupts
	asm volatile ("sei");
	
	while (1)						//Loop Forever
		  {
			ms_spin(DT);
			OCR0=250;
			
			ms_spin(DT);
			OCR0=125;
			
			ms_spin(DT);
			OCR0=75;
			
			ms_spin(DT);
			OCR0=35;
			
			ms_spin(DT);
			OCR0=17;
			
		  };
	}


