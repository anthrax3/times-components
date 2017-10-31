// Copyright 2004-present Facebook. All Rights Reserved.

//package com.facebook.react.views.text;
package uk.co.news.rnttext;

import android.graphics.Paint;
import android.text.style.LineHeightSpan;

/**
 * We use a custom {@link LineHeightSpan}, because `lineSpacingExtra` is broken. Details here:
 * https://github.com/facebook/react-native/issues/7546
 */
public class CustomLineHeightSpan implements LineHeightSpan {
  private final int mHeight;

  CustomLineHeightSpan(float height) {
    this.mHeight = (int) Math.ceil(height);
  }

  @Override
  public void chooseHeight(
      CharSequence text,
      int start,
      int end,
      int spanstartv,
      int v,
      Paint.FontMetricsInt fm) {
    // This is more complicated that I wanted it to be. You can find a good explanation of what the
    // FontMetrics mean here: http://stackoverflow.com/questions/27631736.
    // The general solution is that if there's not enough height to show the full line height, we

    /*
    // will prioritize in this order: ascent, descent, bottom, top

    if (-fm.ascent > mHeight) {
      // Show as much ascent as possible
      fm.top = fm.ascent = -mHeight;
      fm.bottom = fm.descent = 0;
    } else if (-fm.ascent + fm.descent > mHeight) {
      // Show all ascent, and as much descent as possible
      fm.top = fm.ascent;
      fm.bottom = fm.descent = mHeight + fm.ascent;
    } else if (-fm.ascent + fm.bottom > mHeight) {
      // Show all ascent, descent, as much bottom as possible
      fm.top = fm.ascent;
      fm.bottom = fm.ascent + mHeight;
    } else if (-fm.top + fm.bottom > mHeight) {
      // Show all ascent, descent, bottom, as much top as possible
      fm.top = fm.bottom - mHeight;
    } else {
      // Show proportionally additional ascent and top
      final int additional = mHeight - (-fm.top + fm.bottom);
      fm.top -= additional;
      fm.ascent -= additional;
    }
    */

    // will prioritize in this order: descent, ascent, bottom, top

    int height = mHeight;
    int currentHeight = -fm.top + fm.bottom;
    int delta = currentHeight - height;
    if (delta > 0) {
      int bottomSpaceAvailable = fm.bottom - fm.descent;
      int topSpaceAvailable = -fm.top - -fm.ascent;
      if (topSpaceAvailable > 0 && delta > 0) {
        int topSpaceTaken = topSpaceAvailable;
        if (delta < topSpaceTaken) {
          topSpaceTaken = delta;
        }
        delta -= topSpaceTaken;
        fm.top = fm.ascent - (topSpaceAvailable - topSpaceTaken);
      }
      if (bottomSpaceAvailable > 0) {
        int bottomSpaceTaken = bottomSpaceAvailable;
        if (delta < bottomSpaceAvailable) {
          bottomSpaceTaken = delta;
        }
        delta -= bottomSpaceTaken;
        fm.bottom = fm.descent + bottomSpaceAvailable - bottomSpaceTaken;
      }
    }

    fm.top += delta;
    if(delta > 0) {
      fm.ascent = Math.max(fm.top, fm.ascent - delta);
    }
  }
}